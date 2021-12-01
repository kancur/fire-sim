import Tree from "./assets/tree.png";
import FlammableObj from "./flamableObj";
const trees = []

const MAX_COLS = 1
const MAX_ROWS = 1

for (let row = 1; row <= MAX_COLS; row++){
  for (let col = 1; col <= MAX_ROWS; col++){
    const tree = new FlammableObj(Tree);
    tree.x = row * 50;
    tree.y = col * 50;
    
    tree.x += Math.floor(Math.random() * 40)
    tree.y += Math.floor(Math.random() * 40)
    trees.push(tree);
  }
}


export default trees;