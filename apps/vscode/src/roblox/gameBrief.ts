const GAME_TYPES = [
	{
		name: "Checkpoint obby",
		loop: "Cross three obstacle sections, activate checkpoints, and reach the finish. Recover from falls at the latest checkpoint.",
	},
	{
		name: "Delivery race",
		loop: "Pick up a parcel, choose a route through hazards, and make three deliveries before the round timer ends.",
	},
	{
		name: "Collection expedition",
		loop: "Explore a compact map, collect three distinct artifacts, and return them to the starting hub.",
	},
	{
		name: "Repair puzzle",
		loop: "Follow visual clues to restore three stations, then activate the central machine to finish the round.",
	},
	{
		name: "Survival arena",
		loop: "Read telegraphed hazards and move between safe zones through three short waves.",
	},
] as const

const SETTINGS = [
	{
		name: "Floating observatory",
		art: "Navy sky, warm instrument lights, and a large moon as the orientation landmark.",
	},
	{
		name: "Rainy rooftop district",
		art: "Cool violet skyline, amber windows, and a lit clock tower above the route.",
	},
	{
		name: "Coral research outpost",
		art: "Layered teal water, orange equipment, and a reef arch framing the playable area.",
	},
	{
		name: "Overgrown clockwork garden",
		art: "Soft green canopies, brass machinery, and a giant sundial visible from spawn.",
	},
	{
		name: "Glacier relay station",
		art: "Pale blue cliffs, warm red beacons, and a cable tower silhouetted against the sky.",
	},
] as const

const TWISTS = [
	"Provide one clearly marked shortcut with an optional risk and a visible safe route.",
	"Change one route or hazard after each completed objective, with a warning before it changes.",
	"Add one optional traversal aid that recharges after use and can be learned in the opening area.",
	"Use three short phase changes with distinct visual cues and time to react before hazards activate.",
] as const

export function generateRobloxGameBrief(seed?: string): string {
	const selectedSeed = seed?.trim() || Math.floor(Math.random() * 2 ** 32).toString(36)
	let state = 2166136261
	for (let i = 0; i < selectedSeed.length; i++) {
		state = Math.imul(state ^ selectedSeed.charCodeAt(i), 16777619)
	}

	function pick<T>(choices: readonly T[]): T {
		state = (Math.imul(state, 1664525) + 1013904223) >>> 0
		return choices[Math.floor((state / 2 ** 32) * choices.length)]
	}

	const gameType = pick(GAME_TYPES)
	const setting = pick(SETTINGS)
	const twist = pick(TWISTS)

	return [
		`Build a playable Roblox prototype for this generated brief (seed ${JSON.stringify(selectedSeed)}).`,
		`Game type: ${gameType.name}. Core loop: ${gameType.loop}`,
		`Setting: ${setting.name}. Art direction and background: ${setting.art}`,
		`Gameplay twist: ${twist}`,
		"Scope: One map, one 2–4 minute round, clear win and failure or recovery behavior, and a restart. Make the core loop playable solo. If the workspace already supports multiplayer, keep player progress isolated and validate objective and reward changes on the server.",
		"Quality gates: Show the objective at spawn. Make paths and hazards readable on mobile, use shape or text alongside color, and keep the skyline clear behind the action. Prefer lightweight geometry, simple lighting, and built-in Roblox assets.",
		"Inspect the current workspace and its rules first. Preserve existing games and unrelated work. Extend the existing Roblox project if one exists, or scaffold a small Rojo project with Luau in an empty workspace. Use Roblox Studio tooling when connected. Implement the prototype, run the available build or playtest checks, and report which checks ran and how to play the result.",
	].join("\n\n")
}
