const fs = require("fs");

function getInput(filePath) {
  const data = fs.readFileSync(filePath).toString("utf-8");
  const pairs = data.split("\n");
  const list1 = [];
  const list2 = [];

  for (const pair of pairs) {
    pairArray = pair.split("   ");
    list1.push(Number.parseInt(pairArray[0]));
    list2.push(Number.parseInt(pairArray[1]));
  }

  return [list1, list2];
}

function run(filePath) {
  const [list1, list2] = getInput(filePath);
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  // Difference score
  let total = 0;
  for (const i in list1) {
    total += Math.abs(list1[i] - list2[i]);
  }

  console.log(total);

  // Similarity score
  total = 0;
  for (const item of list1) {
    list2Count = list2.filter((x) => x === item).length;
    total += list2Count * item;
  }

  console.log(total);
}

run("./input.txt");
