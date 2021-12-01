import * as PIXI from "pixi.js";
import * as particles from "@pixi/particle-emitter";
import FlammableObj from "./FlamableObj";
import FlammableArea from "./FlammableArea";
import gameLoop from "./gameLoop";
import Fire from "./assets/fire.png";
import FireEmitter from "./FireEmitter";
import { particleContainer } from "./particleContainer";
import ForestGenerator from "./ForestGenerator";
import "./style.css";
import SettingsHandlers from "./SettingsHandlers";

const container = new PIXI.Container();

export const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: PIXI.utils.string2hex("#f0f9db"),
});
document.body.appendChild(app.view);

app.stage.addChild(container);
app.stage.addChild(particleContainer);

let debugMode = true;
const debugInput = document.body.querySelector("#debug");
debugInput.checked = debugMode;
debugInput.onchange = () => {
  debugMode = debugInput.checked;
  flamableArea.setDebug(debugMode);
};

const settings = new SettingsHandlers();


const forestGen = new ForestGenerator({
  width: window.innerWidth,
  height: window.innerHeight,
});
export const flamableArea = new FlammableArea(forestGen.trees);

const generateForestButton = document.body.querySelector("#generate");

generateForestButton.addEventListener("click", () => {
  forestGen.density = settings.forestDensity
  forestGen.generateTrees();
  flamableArea.cleanFlamables();
  flamableArea.setFlamables(forestGen.trees);
  container.removeChildren();
  particleContainer.removeChildren();
  container.addChild(...flamableArea.flamables);
});

container.addChild(...flamableArea.flamables);



app.ticker.add((delta) => {
  gameLoop();
});
