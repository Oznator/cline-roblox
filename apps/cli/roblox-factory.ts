import { copyFile, mkdir, mkdtemp, writeFile } from "node:fs/promises"
import path from "node:path"
import { setTimeout as delay } from "node:timers/promises"
import { generateRobloxGameBrief } from "../vscode/src/roblox/gameBrief"

const [outputDirectory, limitArgument, ...extra] = process.argv.slice(2)
const limit = limitArgument === undefined ? Infinity : Number(limitArgument)
if (!outputDirectory || (limitArgument !== undefined && (!Number.isSafeInteger(limit) || limit < 1)) || extra.length) {
	console.error("Usage: bun run roblox:factory <output-directory> [number-of-games]")
	process.exit(1)
}

const repo = path.resolve(import.meta.dir, "../..")
const output = path.resolve(outputDirectory)
await mkdir(output, { recursive: true })

const shutdown = new AbortController()
let activeRun: ReturnType<typeof Bun.spawn> | undefined
function stop() {
	shutdown.abort()
	activeRun?.kill()
}
process.once("SIGINT", stop)
process.once("SIGTERM", stop)

const prompt = [
	"Build a playable local Roblox prototype. Read GAME_BRIEF.md and GAME_QUALITY.md in the project folder.",
	"Keep project writes in this folder. Use built-in Roblox assets and installed development tools.",
	"Do not publish, push, make purchases, install global tools, or alter other projects.",
	"Save a README explaining how to build and play. Run available checks and record pending Studio or device checks.",
].join("\n")

let failures = 0
for (let attempt = 0; attempt < limit && !shutdown.signal.aborted; attempt++) {
	const folder = await mkdtemp(path.join(output, "game-"))
	await writeFile(path.join(folder, "GAME_BRIEF.md"), generateRobloxGameBrief() + "\n")
	await copyFile(path.join(repo, "docs/roblox-game-quality.md"), path.join(folder, "GAME_QUALITY.md"))
	if (shutdown.signal.aborted) {
		break
	}

	console.log(`Starting Roblox build in ${folder}`)
	activeRun = Bun.spawn(
		[
			process.execPath,
			"--conditions=development",
			"src/index.ts",
			"--provider",
			"openai",
			"--yolo",
			"--cwd",
			folder,
			"--timeout",
			"1800",
			prompt,
		],
		{
			cwd: import.meta.dir,
			env: { ...process.env, CLINE_BUILD_ENV: "development" },
			stdin: "ignore",
			stdout: "inherit",
			stderr: "inherit",
		},
	)
	const exitCode = await activeRun.exited
	activeRun = undefined
	const status = shutdown.signal.aborted ? "stopped" : exitCode === 0 ? "agent finished" : "agent failed"
	await writeFile(path.join(folder, "FACTORY_RUN.json"), JSON.stringify({ status, exitCode }, null, 2) + "\n")
	console.log(`${status} (${exitCode}): ${folder}`)

	failures = exitCode === 0 ? 0 : failures + 1
	if (attempt + 1 < limit && !shutdown.signal.aborted) {
		await delay(Math.min(300, 15 * 2 ** Math.min(failures, 5)) * 1000, undefined, { signal: shutdown.signal }).catch(
			(error: unknown) => {
				if (!shutdown.signal.aborted) {
					throw error
				}
			},
		)
	}
}
