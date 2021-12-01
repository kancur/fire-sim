import * as PIXI from "pixi.js";
import * as particles from "@pixi/particle-emitter";
import FlammableObj from "./flamableObj";
import FlammableArea from "./FlammableArea";
import gameLoop from "./gameLoop";
import trees from "./treesGenerator";
import Fire from "./assets/fire.png";
import FireEmitter from "./FireEmitter";
import { particleContainer } from "./particleContainer";

const container = new PIXI.Container();

export const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: PIXI.utils.string2hex("#f0f9db"),
});
document.body.appendChild(app.view);

app.stage.addChild(container);
app.stage.addChild(particleContainer);

export const flamableArea = new FlammableArea(trees);

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
  //console.log(emitter.particleCount);
});
