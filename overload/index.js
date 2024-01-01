function overload(obj, key, fn) {
  const old = obj[key];

  obj[key] = function (...args) {
    if (args.length === fn.length) {
      return fn.apply(this, arg);
    } else if (typeof old === "function") {
      return old.apply(this, args);
    }
  };
}

const search = {};

overload(search, "find", () => {
  console.log("搜索全部");
});

overload(search, "find", (firstName) => {
  console.log(`搜索名${firstName}`);
});

overload(search, "find", (firstName, lastName) => {
  console.log(`搜索姓名${firstName}.${lastName}`);
});
