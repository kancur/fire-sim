import * as PIXI from "pixi.js";
import { colord } from "colord";

const ENV_TEMPERATURE = 20; // degrees celsius

export default class FlammableObj extends PIXI.Sprite {
  constructor(texture) {
    super(PIXI.Texture.from(texture));
    this.angle = Math.random() * 360;
    this.sizeModifiier = Math.random() * 20 - 10;
    this.anchor.set(0.5);
    this.width = 64 + this.sizeModifiier;
    this.height = 64 + this.sizeModifiier;
    this.interactive = true;
    // fire properties
    this._temperature = ENV_TEMPERATURE; // start temperature
    this.decay = 2; // degrees celsius per update
    this.combustionStartTreshold = 300; // degrees celsius
    this.maxCombustionTemperature = 600; // degress celsius
    this._fuelTotal = 200; // amount of total fuel, no unit
    this._fuelCurrent = 200; // amount of fuel remaining
    this._fireStrength = 0;
    this.burntRatio = 0;
    this.on("pointerdown", this.setOnFire);
    this.neighbors = [];
    //this.radiance = 0;   // 0 - 100
    //this.filter = new PIXI.Filter(ColorOverlayFilter);
  }

  update = () => {
    if (
      this.temperature >= this.combustionStartTreshold &&
      this.temperature < this.maxCombustionTemperature
    ) {
      if (this.fuel) {
        this.temperature += 1;
      }
    }

    this.fireStrength = calculateFireStrength(
      this.combustionStartTreshold,
      this.temperature,
      this.maxCombustionTemperature
    );

    this.decayTemperature();
    this.consumeFuel();
    this.calculateBurntRatio();

    let luminance = 100;
    if (this.fireStrength > 0) {
      luminance = 100 - this.fireStrength * 50;
    } else if (this.burntRatio > 0) {
      luminance = 1 - this.burntRatio;
    }
    this.tint = PIXI.utils.string2hex(
      colord({ h: 0, s: 100, l: luminance, a: 1 }).toHex()
    );
  };

  set fuel(amount) {
    if (amount < 0) {
      this._fuelCurrent = 0;
      return;
    }
    this._fuelCurrent = Math.round(amount * 100) / 100;
  }

  get fuel() {
    return this._fuelCurrent;
  }

  set fireStrength(amount) {
    this._fireStrength = Math.round(amount * 100) / 100;
  }

  get fireStrength() {
    return this._fireStrength;
  }

  calculateBurntRatio = () => {
    this.burntRatio = 1 - this.fuel / this._fuelTotal;
    //console.log('burnt -->',this.burntRatio)
  };

  consumeFuel = () => {
    this.fuel -= this.fireStrength * 1;
  };

  decayTemperature = () => {
    if (this.temperature >= ENV_TEMPERATURE) {
      if (this.temperature >= this.combustionStartTreshold && !this.fuel) {
        this.temperature -= this.decay;
      }
      if (this.temperature < this.combustionStartTreshold) {
        this.temperature -= this.decay;
      }
    }
  };

  setOnFire = () => {
    this.temperature = 300;
  };

  raiseTemperature = (degrees) => {
    if (!this.fuel) return;
    if (this.temperature <= this.maxCombustionTemperature) {
      this.temperature = this.temperature + degrees;
    }
  };

  isBurning = () => this.temperature > this.combustionStartTreshold;

  get temperature() {
    return this._temperature;
  }

  set temperature(temperature) {
    if (temperature < ENV_TEMPERATURE) return;
    if (temperature > this.maxCombustionTemperature) return;
    this._temperature = Math.round(temperature * 100) / 100;
  }
}

function calculateFireStrength(
  combustionStartTreshold,
  currentTemperature,
  maxCombustionTemperature
) {
  if (currentTemperature >= combustionStartTreshold) {
    return (
      (currentTemperature - combustionStartTreshold) /
      (maxCombustionTemperature - combustionStartTreshold)
    );
  }
  return 0;
}
