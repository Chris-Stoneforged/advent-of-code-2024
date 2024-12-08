const fs = require("fs");

const writeResult = () => {
  let string = "";
  for (let i = 0; i < array.length; ++i) {
    if (i % length === 0) {
      string += "\n";
    }
    string += array[i];
  }
  fs.writeFileSync("./result.txt", string);
};

const data = fs.readFileSync("./input.txt", "utf-8");
const length = data.indexOf("\n");
const array = data.replaceAll("\n", "").split("");
const height = Math.floor(data.length / length);
const ignoreChar = ".";

const toCoords = (index) => {
  return [Math.floor(index / length), index % length];
};

const fromCoords = (x, y) => {
  return x * length + y;
};

const frequencies = new Map();
for (let i = 0; i < array.length; ++i) {
  const element = array[i];
  if (element === ignoreChar) {
    continue;
  }

  const a = frequencies.get(element) ?? [];
  a.push(i);
  frequencies.set(element, a);
}

const uniqueLocations = new Set();

frequencies.forEach((value, key) => {
  if (key !== "P") {
    return;
  }
  for (let i = 0; i < value.length; ++i) {
    uniqueLocations.add(value[i]);
    for (let j = 0; j < value.length; ++j) {
      if (j === i) {
        continue;
      }

      const [x1, y1] = toCoords(value[i]);
      const [x2, y2] = toCoords(value[j]);
      const [dx, dy] = [x2 - x1, y2 - y1];
      let [lx, ly] = [x2 + dx, y2 + dy];
      while (lx >= 0 && lx < height && ly >= 0 && ly < length) {
        const locationIndex = fromCoords(lx, ly);
        uniqueLocations.add(locationIndex);
        lx += dx;
        ly += dy;
        array[locationIndex] = "#";
      }
    }
  }
});

writeResult();
const numUniqueLocations = uniqueLocations.size;
console.log(`Number of unique antinode locations is ${numUniqueLocations}`);
