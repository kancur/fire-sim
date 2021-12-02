import { SIZE_MULTIPLIER } from './ForestGenerator';

const MAX_NEAREST_OBJ = 16;

export default class FlammableArea {
  constructor(flamables) {
    this.flamables = [...flamables];
    this.setNearestForEach();
    this.prevTime = '';
    this.heatRadiance = 1.3;
    this.min = 20; // at this distance all the heat is transfered
    this.max = Math.pow(100, 2); // no heat transfered from this distance
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
    this.flammables.forEach((flammable, index) => {
      flammable.update();
      if (flammable.isBurning()) {
        //const temp = flammable.currentTemperature
        flammable.nearest.forEach(({ neighbor, distance }) => {
          const normalizedDistance = (Math.pow(distance, 2) - this.min) / (this.max - this.min)
          const cutoffNormalizedDistance = normalizedDistance > 1 ? 1 : normalizedDistance
          const normalizedScalar = 1 - cutoffNormalizedDistance;
          const tempRaise = (this.heatRadiance * (flammable.fireStrength / 10 + 1)) * normalizedScalar;
          neighbor.raiseTemperature(tempRaise);
        });
        //this.setNearest(flammable)
      }
    });

    //this.prevTime = new Date();
  }
}
