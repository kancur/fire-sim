import Tree from "./assets/tree.png";
import FlammableObj from "./FlamableObj";

export default class ForestGenerator {
  constructor(dimensions = {height: 80, width: 80}) {
    this.debug = false;
    this.spacePerTree = 40; // square with 40 pixels long edge
    this.randomness = 100; // pixels
    this.rows = Math.round((dimensions.height - this.randomness) / this.spacePerTree);
    this.cols = Math.round((dimensions.width - this.randomness) / this.spacePerTree);
    this.size_multiplier = 1;
    this.density = 0.8;
    this.trees = [];
    this.generateTrees();
  }

  generateTrees = () => {
    this.trees = [];
    for (let row = 1; row <= this.cols; row++) {
      for (let col = 1; col <= this.rows; col++) {
        const position = {
          x:
            row * this.spacePerTree * this.size_multiplier +
            Math.floor(Math.random() * this.randomness * this.size_multiplier),
          y:
            col * this.spacePerTree * this.size_multiplier +
            Math.floor(Math.random() * this.randomness * this.size_multiplier),
        };
        if (Math.random() < this.density) {
          const tree = new FlammableObj(Tree, position, this.size_multiplier);
          tree.debug = this.debug;
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
