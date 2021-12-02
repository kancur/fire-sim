import Tree from "./assets/tree.png";
import FlammableObj from "./FlamableObj";

export default class ForestGenerator {
  constructor(dimensions = {height: 80, width: 80}) {
    this.debug = false;
    this.spacePerTree = 40; // square with 40 pixels long edge
    this.randomness = 100; // pixels
    this.height = dimensions.height;
    this.width = dimensions.width;
    this.rows = this.getRowsCols(this.height);
    this.cols = this.getRowsCols(this.width);
    this.size_multiplier = 1;
    this.density = 0.8;
    this.trees = [];
    this.generateTrees();
  }

  getRowsCols = (dimension) => Math.round((dimension - this.randomness) / this.spacePerTree) - 1; 
  
  generateTrees = () => {
    this.rows = this.getRowsCols(this.height);
    this.cols = this.getRowsCols(this.width);

    this.trees = [];
    for (let row = 1; row <= this.cols; row++) {
      for (let col = 1; col <= this.rows; col++) {
       //if (this.trees.length > 1) break   // just to test with two trees
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
