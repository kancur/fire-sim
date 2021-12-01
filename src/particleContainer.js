import * as PIXI from "pixi.js";

export const particleContainer = new PIXI.ParticleContainer(10000, {
  scale: true,
  position: true,
  rotation: true,
  uvs: true,
  alpha: true,
});