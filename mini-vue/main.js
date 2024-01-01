// import {
//   ref,
//   effect,
// } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

// const a = ref(10);
// let b = 0;

// effect(() => {
//   b = a.value + 10;
//   console.log("b", b);
// });

// a.value = 20;

// import { effectWatch, reactive } from "./core/index.js";

// const a = ref(10);
// let b = 0;

// effectWatch(() => {
//   b = a.value + 10;
//   console.log("b", b);
// });

// a.value = 20;

// const user = reactive({ age: 10 });
// let nextAge = 0;

// effectWatch(() => {
//   nextAge = user.age + 1;
//   console.log("nextAge", nextAge);
// });

// user.age++;

// mini-vue
// const state = reactive({
//   count: 0,
// });

// window.state = state;

// effectWatch(() => {
//   const app = document.querySelector("#app");
//   app.innerHTML = "";

//   const div = document.createElement("div");
//   div.innerText = `count: ${state.count}`;

//   app.appendChild(div);
// });

// app.render(app.setup());

import { createApp } from "./core/index.js";
import { app } from "./app.js";

createApp(app).mount(document.querySelector("#app"));
