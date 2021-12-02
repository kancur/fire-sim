import * as PIXI from 'pixi.js';
import FlammableArea from './FlammableArea';
import gameLoop from './gameLoop';
import { particleContainer } from './particleContainer';
import ForestGenerator from './ForestGenerator';
import './style.css';
import RangeInput from './inputs/RangeInput';
import CheckboxInput from './inputs/CheckBox';
import ButtonInput from './inputs/ButtonInput';

const container = new PIXI.Container();
export const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: PIXI.utils.string2hex('#f0f9db'),
});
document.body.appendChild(app.view);

app.stage.addChild(container);
app.stage.addChild(particleContainer);

const debugInput = new CheckboxInput('Show temperature (˚C)', false);
debugInput.onInput = (value) => {
  flammableArea.setDebug(value);
};

const forestDensityInput = new RangeInput('Forest density:', 0.05, 1, 0.05, 0.8);
forestDensityInput.onInput = (value) => {
  generateNewForest(value);
};
const heatRadianceInput = new RangeInput('Heat radiance:', 50, 500, 10, 250);
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
  generateNewForest(forestDensityInput.input.value);
};

const forestGen = new ForestGenerator({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const flammableArea = new FlammableArea(forestGen.trees);

container.addChild(...flammableArea.flamables);

app.ticker.add((delta) => {
  gameLoop();
});

function generateNewForest(density) {
  forestGen.density = density;
  forestGen.debug = settings.debugMode;
  forestGen.generateTrees();
  flammableArea.cleanFlamables();
  flammableArea.setFlamables(forestGen.trees);
  container.removeChildren();
  particleContainer.removeChildren();
  container.addChild(...flammableArea.flamables);
}
