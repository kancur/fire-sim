import * as PIXI from "pixi.js";
import FlammableObj from "./flamableObj";
import FlammableArea from "./FlammableArea";
import gameLoop from "./gameLoop";
import trees from "./trees";
let app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: PIXI.utils.string2hex("#f0f9db"),
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

//let sprite = PIXI.Sprite.from(Tree);

export const flamableArea = new FlammableArea(trees);

container.addChild(...flamableArea.flamables);

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

app.ticker.add((delta) => {
  gameLoop();
});
