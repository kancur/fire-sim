import * as PIXI from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
import Fire from './assets/fire.png';
import { particleContainer } from './particleContainer';

export default class SmokeEmitter extends particles.Emitter {
  constructor() {
    super(particleContainer, {
      lifetime: {
        min: 5,
        max: 6,
      },
      frequency: 0.05,
      emitterLifetime: 0,
      maxParticles: 100,
      addAtBack: false,
      pos: {
        x: 0,
        y: 0,
      },
      behaviors: [
        {
          type: 'alpha',
          config: {
            alpha: {
              list: [
                {
                  time: 0,
                  value: 0,
                },
                {
                  time: 0.5,
                  value: 0.1,
                },
                {
                  time: 1,
                  value: 0,
                },
              ],
            },
          },
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                {
                  time: 0,
                  value: 1,
                },
                {
                  time: 1,
                  value: 2,
                },
              ],
            },
            minMult: 0.7,
          },
        },
        {
          type: 'color',
          config: {
            color: {
              list: [
                {
                  time: 0,
                  value: '2b2b2b',
                },
                {
                  time: 1,
                  value: '353535',
                },
              ],
            },
          },
        },
        {
          type: 'rotation',
          config: {
            accel: 0,
            minSpeed: -15,
            maxSpeed: 15,
            minStart: 0,
            maxStart: 360,
          },
        },
        {
          type: 'textureSingle',
          config: {
            texture: PIXI.Texture.from(Fire),
          },
        },
        {
          type: 'spawnShape',
          config: {
            type: 'torus',
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
    this.spawnChance = 0.1;
    this.emit = false;
    this.autoUpdate = true;
  }
}
