import { SIZE_MULTIPLIER } from './ForestGenerator';

const MAX_NEAREST_OBJ = 16;

export default class FlammableArea {
  constructor(flamables) {
    this.flamables = [...flamables];
    this.setNearestForEach();
    this.prevTime = '';
    this.heatRadiance = 250;
  }

  cleanFlamables = () => {
    this.flamables.forEach((flamable) => {
      flamable.fireEmitter.destroy();
      flamable.smokeEmitter.destroy();
    });

    this.flamables = [];
  };

  setFlamables = (flamables) => {
    this.flamables = [...flamables];
    this.setNearestForEach();
  };

  push(flamables) {
    this.flamables = [...this.flamables, flamables];
  }

  get flammables() {
    return this.flamables;
  }

  setNearestForEach() {
    this.flammables.forEach((flammable) => {
      this.setNearest(flammable);
    });
  }

  setDebug(bool) {
    this.flamables.forEach((flamable) => {
      flamable.debug = bool;
    });
  }

  setNearest(flammable) {
    const withDistances = [];
    this.flamables.forEach((neighbor) => {
      const a = flammable.x - neighbor.x;
      const b = flammable.y - neighbor.y;
      const c = Math.round(Math.sqrt(a * a + b * b));
      withDistances.push({ neighbor, distance: c });
    });

    const sorted = withDistances.sort((a, b) => a.distance - b.distance);
    // start from 1, because 0 is the same object itself
    const nearest = sorted.slice(1, MAX_NEAREST_OBJ + 1);

    flammable.nearest = nearest;
  }

  update() {
    //if ((new Date() - this.prevTime) < 1000) return
    this.flammables.forEach((flammable) => {
      flammable.update();
      if (flammable.isBurning()) {
        //const temp = flammable.currentTemperature
        flammable.nearest.forEach(({ neighbor, distance }) => {
          const tempRaise = (this.heatRadiance * (flammable.fireStrength / 8 + 1)) / (distance * 7);
          neighbor.raiseTemperature(tempRaise);
        });
        //this.setNearest(flammable)
      }
    });

    //this.prevTime = new Date();
  }
}
