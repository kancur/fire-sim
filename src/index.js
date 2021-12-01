import * as PIXI from "pixi.js";
import * as particles from "@pixi/particle-emitter";
import FlammableObj from "./FlamableObj";
import FlammableArea from "./FlammableArea";
import gameLoop from "./gameLoop";
import Fire from "./assets/fire.png";
import FireEmitter from "./FireEmitter";
import { particleContainer } from "./particleContainer";
import ForestGenerator from "./ForestGenerator";
import './style.css';

const container = new PIXI.Container();

export const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: PIXI.utils.string2hex("#f0f9db"),
});
document.body.appendChild(app.view);

app.stage.addChild(container);
app.stage.addChild(particleContainer);


let debugMode = true;
const debugInput = document.body.querySelector('#debug')
debugInput.checked = debugMode
debugInput.onchange = () => {
    debugMode = debugInput.checked
    flamableArea.setDebug(debugMode)
}
const forestGen = new ForestGenerator({width: window.innerWidth, height: window.innerHeight})
export const flamableArea = new FlammableArea(forestGen.trees);

container.addChild(...flamableArea.flamables);

/* 
container.x = app.screen.width / 2;
container.y = app.screen.height / 2; */
/* 
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2; */

app.ticker.add((delta) => {
  gameLoop();
  //emitter.update(0.016);
});
