const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf-8");
const stones = data.split(" ").map((d) => Number.parseInt(d));

const blink = () => {
  let i = 0;
  while (i < stones.length) {
    if (stones[i] === 0) {
      stones[i] = 1;
    } else {
      const str = stones[i].toString();
      const len = str.length;
      if (len % 2 === 0) {
        const part1 = str.substring(0, len / 2);
        const part2 = str.substring(len / 2);
        stones[i] = Number.parseInt(part2);
        stones.splice(i, 0, Number.parseInt(part1));
        i += 1;
      } else {
        stones[i] = stones[i] * 2024;
      }
    }
    i += 1;
  }
};

for (let i = 0; i < 26; ++i) {
  blink();
}

console.log(`Number of stones: ${stones.length}`);
