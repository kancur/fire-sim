import * as PIXI from "pixi.js";


export default class TextLabel extends PIXI.BitmapText {
  constructor(text = "heyo"){
    super(text, { fontName, fontSize: 20 })
  }
}

const fontName = "ExampleFont";
PIXI.BitmapFont.from(
  fontName,
  {
    fill: "#ff0000",
    fontSize: 20,
    fontWeight: "bold",
  },
  {
    resolution: 1,
    textureHeight: 1024,
    textureWidth: 1024,
    chars: PIXI.BitmapFont.ALPHANUMERIC,
  }
);
