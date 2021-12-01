import * as PIXI from "pixi.js";
import * as particles from "@pixi/particle-emitter";
import Fire from "./assets/fire.png";
import { particleContainer } from "./particleContainer";

export default class FireEmitter extends particles.Emitter {
  constructor() {
    super(particleContainer, {
      lifetime: {
        min: 1,
        max: 1.5,
      },
      frequency: 0.15,
      emitterLifetime: 0,
      maxParticles: 1000,
      addAtBack: false,
      pos: {
        x: 0,
        y: 0,
      },
      behaviors: [
        {
          type: "alpha",
          config: {
            alpha: {
              list: [
                {
                  time: 0,
                  value: 0,
                },
                {
                  time: 0.1,
                  value: 1,
                },
                {
                  time: 1,
                  value: 0,
                },
              ],
            },
          },
        },
        /*       {
            type: "moveSpeedStatic",
            config: {
              min: 0,
              max: 50,
            },
          }, */
        {
          type: "scale",
          config: {
            scale: {
              list: [
                {
                  time: 0,
                  value: 0.3,
                },
                {
                  time: 1,
                  value: 1,
                },
              ],
            },
            minMult: 0.5,
          },
        },
        {
          type: "color",
          config: {
            color: {
              list: [
                {
                  time: 0,
                  value: "f7cf60",
                },
                {
                  time: 0.2,
                  value: "ff9000",
                },
                {
                  time: 1,
                  value: "666666",
                },
              ],
            },
          },
        },
        {
          type: "rotation",
          config: {
            accel: 0,
            minSpeed: -50,
            maxSpeed: 50,
            minStart: 0,
            maxStart: 360,
          },
        },
        {
          type: "textureSingle",
          config: {
            texture: PIXI.Texture.from(Fire),
          },
        },
        {
          type: "spawnShape",
          config: {
            type: "torus",
            data: {
              x: 0,
              y: 0,
              radius: 20,
              innerRadius: 0,
              affectRotation: false,
            },
          },
        },
      ],
    });
    this.emit = false;
    this.autoUpdate = true;
  }
}
