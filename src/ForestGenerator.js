import Tree from "./assets/tree.png";
import FlammableObj from "./FlamableObj";

export default class ForestGenerator {
  constructor(dimensions = {height: 80, width: 80}) {
    this.spacePerTree = 40; // square with 40 pixels long edge
    this.rows = Math.round(dimensions.height / this.spacePerTree);
    this.cols = Math.round(dimensions.width / this.spacePerTree);
    console.log(this.rows)
    this.SIZE_MULTIPLIER = 1;
    this.DENSITY = 1;
    this.randomness = 70; // pixels
    this.trees = [];
    this.generateTrees();
  }

  generateTrees = () => {
    for (let row = 1; row <= this.cols; row++) {
      for (let col = 1; col <= this.rows; col++) {
        const position = {
          x:
            row * this.spacePerTree * this.SIZE_MULTIPLIER +
            Math.floor(Math.random() * this.randomness * this.SIZE_MULTIPLIER),
          y:
            col * this.spacePerTree * this.SIZE_MULTIPLIER +
            Math.floor(Math.random() * this.randomness * this.SIZE_MULTIPLIER),
        };
        if (Math.random() < this.DENSITY) {
          const tree = new FlammableObj(Tree, position, this.SIZE_MULTIPLIER);
          this.trees.push(tree);
        }
      }
    }
  };
}

/* const trees = []

const MAX_COLS = 30
const MAX_ROWS = 30
const DENSITY = 0.5 // probability of tree appearing

export const SIZE_MULTIPLIER = 1

for (let row = 1; row <= MAX_COLS; row++){
  for (let col = 1; col <= MAX_ROWS; col++){
    const position = {
      x: (row * 40 * SIZE_MULTIPLIER) + Math.floor(Math.random() * 70 * SIZE_MULTIPLIER),
      y: (col * 40 * SIZE_MULTIPLIER) + Math.floor(Math.random() * 70 * SIZE_MULTIPLIER),
    }
    if (Math.random() < DENSITY) {
      const tree = new FlammableObj(Tree, position, SIZE_MULTIPLIER);    
      trees.push(tree);
      console.log('pushing tree', tree)
    }
  }
} */
