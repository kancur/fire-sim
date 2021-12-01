import Tree from "./assets/tree.png";
import FlammableObj from "./flamableObj";
const trees = []

const MAX_COLS = 50
const MAX_ROWS = 30
const DENSITY = 0.8 // probability of tree appearing

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
    }
  }
}


export default trees;