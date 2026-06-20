# Plants Against Derps — UI + PVP Prototype

A goofy browser lane-defense game made for GitHub Pages.

## v2.9 highlights
- Redesigned responsive homepage UI.
- Experimental online and local two-tab PvP.
- One player controls Plants; the other controls Derps.
- Host-customizable rounds: 1–10 minutes, 100–5000 starting Glow, and selectable existing backgrounds.
- Six random units per side, three single-slot rerolls, ready confirmation, and synchronized combat.
- No Glow producers in PvP. Plant stats are normalized around level 2-style balance.
- Every side loses when it has no Glow and no surviving units; Derps can also win by reaching the Plant base.
- Hard level-cell outlines were removed from Story Mode so World 5 glitch backgrounds remain readable.

## PvP testing
1. Open **PVP** from the homepage.
2. One player creates an Online Room and shares the code.
3. A second browser/device joins with that code.
4. Preview the random loadout, use up to three rerolls, and press Ready.
5. The host validates actions and broadcasts the match state.

A Local Two-Tab mode is included for testing on one computer.

## Experimental anti-cheat
The host validates role, loadout slot, Glow cost, cooldown, lane/tile, action frequency, and round state. Invalid actions remove the player from the current round. This is useful for friendly testing, but it is not fully secure because the host still runs in a browser. Truly competitive public PvP will eventually need server-side validation through a Supabase Edge Function or another authoritative game server.

## Story mode
Select a loadout and defend the lawn. Twigs purchase badges; Sticks upgrade and unlock plants. Every fifth level is a harder Challenge level. World 5 is the Clown Multiverse and includes Blood Clown Moon phases.

## Modding and fangames
The repo includes the PAD Modder/Fangame Forge. Feel free to fork the project and make a fangame. Credit is appreciated.
