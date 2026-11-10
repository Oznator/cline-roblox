# Build a playable Roblox increment

Run this workflow in the game workspace with a brief or a specific change. Use `docs/roblox-game-quality.md` as the review rubric when present. Use the workspace's own game brief and established conventions.

## Establish the target

1. Inspect the workspace for a game brief, Rojo project files, tool manifests, source and tests. In a multi-place project, identify which place the request applies to before editing or syncing. For a new game, create a small Rojo project in an empty game directory.
2. Choose one complete loop a player can start, finish and restart. Record the player goal, first action, feedback, win or failure condition, and one visual direction for the environment. Use the requested idea or generated brief and keep the prototype within one small playable area when practical.
3. Use local, reproducible assets for the prototype. Prefer built-in geometry, materials, lighting and effects while the mechanic is still changing. Record any external assets and their provenance.

## Build the increment

1. Reuse the project's tooling and layout. For a new project, map server-only Luau to `ServerScriptService`, presentation and input to `StarterPlayerScripts` or `StarterGui`, and shared types and public configuration to `ReplicatedStorage`. Prefer typed Luau for new gameplay modules.
2. Keep round state, scoring and rewards on the server. Clients submit actions and render feedback. Validate client requests on the server using the current game state and clear limits. Keep round rules in small modules so state transitions can be tested independently of the world.
3. Add visible onboarding and a clear way to retry. Check target input modes, HUD readability and the contrast between interactive objects and the environment.
4. Keep the game source and the Rojo mapping in Git. In a hybrid Studio project, identify which content belongs to Studio and which belongs to Rojo before changing it. Use live sync only against a local development place that matches the project's mapping.

## Verify the playable build

1. Run the workspace's configured formatter, Luau checks and tests. For a new project, prefer versioned tool configuration and add focused checks for the core rules and state transitions.
2. Run the project's build command or `rojo build -o build.rbxlx` from the project root when it has the default Rojo project. With a custom mapping, use the target project file explicitly. If Rojo is unavailable, record the exact command as pending.
3. Open the output in Roblox Studio or use `rojo serve` with the Studio Rojo plugin for local iteration. Play from spawn through the core loop and retry while checking client and server output. Use Server & Clients with two clients for shared state, scoring, join and leave behavior. Use Device Simulator for touch and small screens, and test performance on representative hardware when available.
4. Record the changed files, exact commands, build output path and observed test results. Separate passing checks from tests that need Studio or a device. Use the quality rubric to flag remaining prototype gaps and keep the place local unless the user explicitly requests Roblox publication.

[Rojo project setup and live sync](https://rojo.space/docs/v7/getting-started/new-game/) · [Roblox Studio testing modes](https://create.roblox.com/docs/studio/testing-modes)
