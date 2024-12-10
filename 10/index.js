const fs = require("fs");

const data = fs.readFileSync(
  "/Users/chris/Documents/advent-of-code/10/input.txt",
  "utf-8"
);
const mapArray = data
  .replaceAll("\n", "")
  .split("")
  .map((e) => Number.parseInt(e));
const mapWidth = data.indexOf("\n");
const targetHeight = 9;
const startingHeight = 0;

const getAdjacent = (index) => {
  const adjacent = [];
  // Left
  if (index % mapWidth > 0) {
    adjacent.push(index - 1);
  }
  // Right
  if (index % mapWidth < mapWidth - 1) {
    adjacent.push(index + 1);
  }
  // Up
  if (index >= mapWidth) {
    adjacent.push(index - mapWidth);
  }
  // Down
  if (index < mapArray.length - mapWidth) {
    adjacent.push(index + mapWidth);
  }
  return adjacent;
};

const trailHeads = [];
mapArray.forEach((value, index) => {
  if (value === startingHeight) {
    trailHeads.push(index);
  }
});

const traverseTrail = (currentHeight, index, ends) => {
  if (mapArray[index] === targetHeight) {
    ends.push(index);
    return;
  }

  const adjacent = getAdjacent(index);
  for (i of adjacent) {
    if (mapArray[i] == currentHeight) {
      traverseTrail(currentHeight + 1, i, ends);
    }
  }
};

let totalSore = 0;
for (const head of trailHeads) {
  const trailEnds = [];
  traverseTrail(startingHeight + 1, head, trailEnds);
  totalSore += trailEnds.length;
}

console.log(`Total score = ${totalSore}`);
