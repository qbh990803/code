function observe(obj) {
  // 遍历对象的所有属性
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    // 创建一个Dep实例，用于收集依赖和触发更新
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        if (Dep.target) {
          dep.depend();
        }
        return value;
      },
      set(newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
        // 触发更新
        dep.notify();
      },
    });
  });
}

// 依赖收集器
class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (Dep.target) {
      this.subscribers.add(Dep.target);
    }
  }

  notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber();
    });
  }
}

Dep.target = null;

// 示例数据对象
const data = {
  name: "Alice",
  age: 20,
};

// 对数据对象进行代理
observe(data);

// 示例的观察者函数
function update() {
  console.log("数据已更新");
}

// 设置观察者函数为当前的依赖
Dep.target = update;

// 访问数据属性，触发依赖收集
console.log(data.name); // 输出：Alice

// 修改数据属性，触发更新
data.name = "Bob"; // 输出：数据已更新
