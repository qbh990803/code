export class Dep {
  constructor(value) {
    this._val = value;
    this.effects = new Set();
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(value) {
    this._val = value;
    this.notice();
  }

  depend() {
    if (effectFn) {
      this.effects.add(effectFn);
    }
  }

  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

export function ref(value) {
  return new Dep(value);
}

let effectFn = null;
export function effectWatch(fn) {
  effectFn = fn;
  fn();
  effectFn = null;
}

let targetMap = new Map();
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);

      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);

      const result = Reflect.set(target, key, value);

      dep.notice();
      return result;
    },
  });
}

function getDep(raw, key) {
  let depMap = targetMap.get(raw);
  if (!depMap) {
    depMap = new Map();
    targetMap.set(raw, depMap);
  }
  let dep = depMap.get(key);
  if (!dep) {
    dep = new Dep();
    depMap.set(key, dep);
  }
  return dep;
}
