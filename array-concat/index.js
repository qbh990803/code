const arr = Array.prototype.concat.apply(
  ["foo"],
  [
    [1, 2, ["a"]],
    [3, 4],
  ]
);

const arr2 = [].concat([
  [1, 2],
  [3, 4],
]);

const numbers = [5, 6, 2, 3, 7];

console.log("arr-apply", arr);
console.log("arr-concat", arr2);

const max = Math.max(...numbers); // 7
console.log("max", max);
