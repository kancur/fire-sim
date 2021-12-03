![Forest Fire Simulator Featured Image](https://github.com/kancur/fire-sim/blob/main/featured.jpg?raw=true)

# Forest fire simulator

A quick project to sharpen my OOP skills.

[Live Version available here](https://kancur.github.io/fire-sim/)

## Basic mechanism

Set any tree on fire by clicking it.
Burning trees radiate heat, depending on their current burn temperature. This heat is transferred to nearby trees, losing energy with distance².

## Known issues
Might [fail to render in Firefox on Linux under XORG](https://github.com/pixijs/pixijs/issues/6494) - should work great on chromium browsers on all platforms
