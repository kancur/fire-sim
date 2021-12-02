import * as PIXI from 'pixi.js';
import FlammableArea from './FlammableArea';
import gameLoop from './gameLoop';
import { particleContainer } from './particleContainer';
import ForestGenerator from './ForestGenerator';
import './style.css';
import RangeInput from './inputs/RangeInput';
import CheckboxInput from './inputs/CheckBox';
import ButtonInput from './inputs/ButtonInput';
import BgImage from './assets/seamless-dirt-grass.jpg';

const container = new PIXI.Container();
const bg = new PIXI.Container();

export const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: PIXI.utils.string2hex('#a3814f'),
});
document.body.appendChild(app.view);
window.addEventListener('resize', handleResize)

let backgroundTexture = PIXI.Texture.from(BgImage);
const backgroundSprite = new PIXI.TilingSprite(backgroundTexture, window.innerWidth, window.innerHeight);
backgroundSprite.tileScale = { x: 0.5, y: 0.5 };
bg.addChild(backgroundSprite);

app.stage.addChild(bg);
app.stage.addChild(container);
app.stage.addChild(particleContainer);

const debugInput = new CheckboxInput('Show temperature (˚C)', false);
debugInput.onInput = (value) => {
  flammableArea.setDebug(value);
};

const forestDensityInput = new RangeInput('Forest density:', 0.05, 1, 0.05, 0.8);
forestDensityInput.onInput = (value) => {
  generateNewForest(value, distributionRandomnessInput.input.value);
};

const distributionRandomnessInput = new RangeInput('Distribution randomness:', 1, 150, 1, 100);
distributionRandomnessInput.onInput = (value) => {
  generateNewForest(forestDensityInput.input.value, value);
};

const heatRadianceInput = new RangeInput('Heat radiance:', 0, 3, 0.1, 1.3);
heatRadianceInput.onInput = (value) => {
  flammableArea.heatRadiance = value;
};

const resetButton = new ButtonInput('Reset to defaults');
resetButton.onClick = () => {
  forestDensityInput.reset();
  heatRadianceInput.reset();
  debugInput.reset();
};

const newForestButton = new ButtonInput('Generate new forest');
newForestButton.onClick = () => {
  generateNewForest(forestDensityInput.input.value, distributionRandomnessInput.input.value);
};

const forestGen = new ForestGenerator({
  width: window.innerWidth,
  height: window.innerHeight,
});

function handleResize() {
  bg.width = window.innerWidth
  bg.height = window.innerHeight
}

export const flammableArea = new FlammableArea(forestGen.trees);

container.addChild(...flammableArea.flamables);

app.ticker.add((delta) => {
  gameLoop();
});

function generateNewForest(density, distributionRandomness) {
  forestGen.density = density;
  forestGen.randomness = distributionRandomness;
  forestGen.debug = settings.debugMode;
  forestGen.generateTrees();
  flammableArea.cleanFlamables();
  flammableArea.setFlamables(forestGen.trees);
  container.removeChildren();
  particleContainer.removeChildren();
  container.addChild(...flammableArea.flamables);
}
