# Roblox game quality guide

Use this guide when starting a Roblox prototype or reviewing a change to an existing experience. Keep the design brief and playtest notes with the game so the next iteration starts from what players actually did.

## Design a playable slice

- Describe the player fantasy and audience in one sentence. Write the core loop as a sequence of actions and feedback, with a goal the player can reach in one short session.
- Pick one mechanic that makes the concept distinct. Build one complete loop with a start, success or failure, feedback, and a replay or reset before adding progression, extra maps, or currencies.
- For a generated concept, record the idea or seed if available, and explain how the chosen mechanic reinforces the genre. Give the first slice a concrete win condition and say how a player can try it in Studio.
- Reuse the project's folder layout and toolchain. Keep gameplay rules and their tunable values in versioned Luau. Put manual Studio setup and asset dependencies in the project notes so a second developer can run the same build.

## World, background, and feedback

- Pick a visual direction with a small palette, lighting mood, and a few repeatable shapes. Use silhouettes, landmarks, and lighting to tell players where they are and where they can go.
- Design the background at the gameplay camera angle. Separate interactive objects and routes from scenery using shape, contrast, and placement. Check the spawn view and a busy gameplay view on a narrow screen.
- Use Roblox materials and reusable props for early builds. Track the source and usage rights of imported art and audio. Inspect imported models and keep only the assets and scripts the game needs.
- Give key actions immediate feedback with text, animation, sound, or effects. Use a second cue when color or audio carries critical information. Keep decorative particles and motion out of the main sightline.

## Controls and onboarding

- Make the first goal visible from spawn and teach the first action through play. Give the player a clear outcome and a next step on success, failure, or respawn.
- Verify every core action with keyboard and mouse and with touch if mobile is supported. Check controller focus and prompts if gamepad is supported.
- Check text readability, button reachability, and HUD overlap with the Roblox interface on the smallest supported screen. Verify that critical information survives larger text, muted audio, and reduced effects where applicable.

## Runtime and multiplayer

- Choose a baseline device and agree on a frame-rate and memory target before polishing. Measure spawn, a full session, and the busiest scene on physical hardware. Use the Studio emulator for layout and controls. [Roblox guidance on testing hardware](https://create.roblox.com/docs/performance-optimization/test-on-hardware)
- Prefer event-driven logic and reuse assets. Clean up connections, effects, and temporary instances on round end and player departure. Check frame time and memory across several rounds to catch accumulation. [Roblox guidance on designing for performance](https://create.roblox.com/docs/performance-optimization/design)
- Make the server authoritative for scores, rewards, inventories, and shared state. Validate remote input type, bounds, permissions, and game state, and enforce rate limits on the server where needed. [Roblox guidance on the client–server boundary](https://create.roblox.com/docs/scripting/security/client-server-boundary)
- Test with a Studio server and at least two clients when the experience has multiplayer state. Verify concurrent actions, late joins, disconnects, respawns, and round resets. Include a retry or recovery check if the game saves progress. [Roblox Studio testing modes](https://create.roblox.com/docs/studio/testing-modes)

## Playtest gates

| Gate | Evidence to record |
| --- | --- |
| Playable | A new player can spawn, identify the first goal, complete the core loop, and restart. Record where they hesitated or needed help. |
| Readable | Spawn and active gameplay are legible on a small screen, and each supported input can complete the loop. |
| Consistent | The server and clients agree on shared outcomes through join, leave, respawn, and reset. Persistent rewards recover cleanly if the game uses saves. |
| Performant | Record the device, player count, scenario, frame rate or frame time, and memory against the project's targets. |
| Repeatable | Another developer can open or sync the place and run the slice using the repository instructions. |

Mark each gate as passed, failed, or pending, with the date, build, and evidence. A gate that needs a Studio session or physical device stays pending until someone runs it.
