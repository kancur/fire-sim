import * as PIXI from "pixi.js";
import { colord } from "colord";
import FireEmitter from "./FireEmitter";
import TextLabel from "./TextLabel";
import SmokeEmitter from "./SmokeEmitter";
const ENV_TEMPERATURE = 20; // degrees celsius

export default class FlammableObj extends PIXI.Container {
  constructor(texture, position, scale) {
    super();
    //super(PIXI.Texture.from(texture));
    this.x = position.x;
    this.y = position.y;
    this.sizeModifiier = Math.random() * 20 - 10;

    this.sprite = new PIXI.Sprite(PIXI.Texture.from(texture));
    this.sprite.anchor.set(0.5);
    this.sprite.angle = Math.random() * 360;
    this.sprite.width = (64 + this.sizeModifiier) * scale;
    this.sprite.height = (64 + this.sizeModifiier) * scale;

    this.interactive = true;
    this.debug = true;
    // fire properties
    this._temperature = ENV_TEMPERATURE; // start temperature
    this.tempRisePerTickLimit = 10;
    this.plannedTempRise = [];
    this.decay = 0.5; // degrees celsius per update
    this.burnSpeed = 0.5 * scale;
    this.combustionStartTreshold = 300 + (Math.random() * 100); // degrees celsius
    this.maxCombustionTemperature = 600; // degress celsius
    this._fuelTotal = 200 * scale + (Math.random() * 100); // amount of total fuel, no unit
    this._fuelCurrent = this._fuelTotal; // amount of fuel remaining
    this._fireStrength = 0;
    this.burntRatio = 0;
    this.on("pointerdown", this.setOnFire);
    this.neighbors = [];
    this.fireEmitter = new FireEmitter();
    this.smokeEmitter = new SmokeEmitter();

    this.textLabel = new TextLabel("");
    this.textLabel.anchor = 0.5;

    this.init();
    //this.radiance = 0;   // 0 - 100
    //this.filter = new PIXI.Filter(ColorOverlayFilter);
  }

  init = () => {
    this.fireEmitter.updateOwnerPos(this.x, this.y);
    this.smokeEmitter.updateOwnerPos(this.x, this.y);
    this.addChild(this.sprite);
    this.addChild(this.textLabel);
  };

  shouldActivelyBurn = () => {
    if (this.fuel) {
      if (this.temperature >= this.combustionStartTreshold) {
        return true;
      }
    }
    return false;
  };

  heatUp = () => {
    if (this.temperature < this.maxCombustionTemperature) {
      this.temperature += 0.6;
    }
  };

  update = () => {
    this.dumpPlannedTempRise();
    this.updateDebugText();

    if (this.burntRatio === 1) {
      this.updateSmokeStrength();
    }
    
    const shouldBurn = this.shouldActivelyBurn();
    if (shouldBurn) {
      this.smokeEmitter.emit = true;
      this.fireEmitter.emit = true;
      this.updateFireProps();
      this.heatUp();
      this.consumeFuel();
      this.calculateBurntRatio();
      this.calculateFireStrength();
      this.burnVisually();
    } else {
      this.fireEmitter.emit = false;
      this.decayTemperature();
    }
  };

  updateSmokeStrength = () => {
    const chance = (Math.round((this.temperature / this.maxCombustionTemperature) * 100) / 100) / 8
    this.smokeEmitter.spawnChance = (chance > 0.02) ? chance : 0
  }

  updateDebugText = () => {
    if (this.debug) {
      this.textLabel.text = Math.round(this.temperature);
    } else {
      this.textLabel.text = "";
    }
  }
  
  updateFireProps = () => {
    const spawnChance = this.fireStrength + 0.1
    this.fireEmitter.spawnChance = spawnChance;
  }

  dumpPlannedTempRise = () => {
    const total = this.plannedTempRise.reduce((total, current) => total + current, 0)

    if (total > this.tempRisePerTickLimit) {
      this.temperature += this.tempRisePerTickLimit;
    } else {
      this.temperature += total;
    }
    this.plannedTempRise = [];
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

  burnVisually = () => {
    this.sprite.tint = PIXI.utils.string2hex(
      colord({ h: 0, s: 0, l: 100 - this.burntRatio * 65, a: 1 }).toHex()
    );
  };

  calculateBurntRatio = () => {
    this.burntRatio = 1 - this.fuel / this._fuelTotal;
  };

  consumeFuel = () => {
    this.fuel -= this.fireStrength * this.burnSpeed;
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
    this.temperature = 450;
  };

  raiseTemperature = (degrees) => {
    //if (!this.fuel) return;
    if (this.temperature <= this.maxCombustionTemperature) {
      // will only receive half the heat from next tree per tick
      const reducedTemp = degrees / (this.plannedTempRise.length + 1)
      this.plannedTempRise.push(reducedTemp);
    }
  };

  isBurning = () => this.shouldActivelyBurn();

  get temperature() {
    return this._temperature;
  }

  set temperature(temperature) {
    if (temperature < ENV_TEMPERATURE) return;
    if (temperature > this.maxCombustionTemperature) return;
    this._temperature = Math.round(temperature * 100) / 100;
  }

  calculateFireStrength = () => {
    const divisor =
      this.maxCombustionTemperature - this.combustionStartTreshold;
    if (divisor > 0) {
      this.fireStrength =
        (this.temperature - this.combustionStartTreshold) / divisor;
    }
  };
}
