const fs = require("fs");
const { format } = require("path");

const data = fs.readFileSync(
  "/Users/chris/Documents/advent-of-code/09/input.txt",
  "utf-8"
);
let formatted = [];
let id = 0;
for (let i = 0; i < data.length; ++i) {
  if (i % 2 === 0) {
    for (let j = 0; j < data[i]; ++j) {
      formatted.push(id);
    }
    id += 1;
  } else {
    for (let j = 0; j < data[i]; ++j) {
      formatted.push(".");
    }
  }
}

let left = 0;
let right = formatted.length - 1;

const nextLeft = () => {
  while (formatted[left] !== ".") {
    left += 1;
  }
  return left;
};

const nextRight = () => {
  while (formatted[right] === ".") {
    right -= 1;
  }
  return right;
};

const print = () => {
  console.log(formatted.map((f) => f.toString()).join(""));
};

// Part 1
// const copy = [...formatted];
// while (left < right - 2) {
//   const l = nextLeft();
//   const r = nextRight();
//   const t = formatted[l];
//   copy[l] = formatted[r];
//   copy[r] = t;
// }

// let totalChecksum = 0;
// for (let i = 0; i < copy.indexOf("."); ++i) {
//   totalChecksum += i * copy[i];
// }

// console.log(`Total checksum = ${totalChecksum}`);

// Part 2
const getleftSpace = (r, requiredSpace) => {
  let l = 0;
  while (l < r) {
    s = 0;
    while (formatted[l] !== ".") {
      l += 1;
    }
    while (formatted[l + s] === ".") {
      s += 1;
    }
    if (l + s < r && s >= requiredSpace) {
      return l;
    }
    l += s;
  }

  return -1;
};

const nextRightSpace = (prevRight) => {
  let r = prevRight,
    s = 0;
  while (formatted[r] === ".") {
    r -= 1;
  }
  const char = formatted[r];
  while (formatted[r] === char) {
    s += 1;
    r -= 1;
  }

  return [r + 1, s];
};
print();
let currentRight = formatted.length - 1;
while (currentRight > 0) {
  const [r, s] = nextRightSpace(currentRight);
  currentRight = r - 1;
  const l = getleftSpace(r, s);
  if (l < 0) {
    continue;
  }

  for (let i = 0; i < s; ++i) {
    const t = formatted[r + i];
    formatted[r + i] = formatted[l + i];
    formatted[l + i] = t;
  }

  currentRight = r - 1;
}

let totalChecksum = 0;
for (let i = 0; i < formatted.length; ++i) {
  if (formatted[i] === ".") {
    continue;
  }
  totalChecksum += i * formatted[i];
}

//print();
console.log(`Total checksum = ${totalChecksum}`);
