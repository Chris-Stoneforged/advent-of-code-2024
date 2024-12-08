const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf-8");
const lines = data.split("\n");
const maxX = lines.length;
const maxY = data.indexOf("\n");
const grid = lines.map((l) => l.split(""));

const findStartingPosition = () => {
  for (let x = 0; x < grid.length; ++x) {
    const y = grid[x].indexOf("^");
    if (y >= 0) {
      return [x, y];
    }
  }
};

let [x, y] = findStartingPosition();
let totalMoves = 1;
let directionIndex = 0;
let directionVectors = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];
const objChar = "#";
const visitedChar = "X";
grid[x][y] = visitedChar;

while (true) {
  const [a, b] = directionVectors[directionIndex];
  if (grid[x + a] === undefined || grid[x + a][y + b] === undefined) {
    break;
  }

  if (grid[x + a][y + b] === objChar) {
    directionIndex += 1;
    if (directionIndex === directionVectors.length) {
      directionIndex = 0;
    }
    continue;
  }

  if (grid[x + a][y + b] !== visitedChar) {
    grid[x + a][y + b] = "X";
    totalMoves += 1;
  }

  x += a;
  y += b;
}

console.log(`Total Moves = ${totalMoves}`);
