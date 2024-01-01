import { reactive, h } from "./core/index.js";

window.h = h;

export const app = {
  render(context) {
    // const element = document.createElement("div");
    // const text1 = document.createTextNode("count：");
    // const text2 = document.createTextNode(`${context.state.count}`);
    // element.append(text1, text2);

    // return element;

    // const vNode = h(
    //   "div",
    //   {
    //     class: "test",
    //     id: "first",
    //   },
    //   `count: ${context.state.count}`
    // );

    // test1: tag
    // const vNode = h(
    //   context.state.tag,
    //   {
    //     class: "test",
    //     id: "first1",
    //   },
    //   [
    //     h("span", { class: "label" }, "count："),
    //     h("span", { class: "value" }, `${context.state.count}`),
    //   ]
    // );
    // return vNode;

    // test2: 添加删除props
    // const vNode = h("div", context.state.props, "");
    // return vNode;

    // test3:
    // 1.newChildren:sting oldChildren: string | array
    // 2.newChildren:array oldChildren: string | array
    // const vNode = h("div", context.state.props, context.state.children);
    // return vNode;

    // test4:
    // newChildren: [a,b,c]
    // oldChildren: [a,b]
    // newChildren > oldChildren
    const vNode = h("div", context.state.props, context.state.children);
    return vNode;
  },

  setup() {
    const state = reactive({
      count: 0,
      tag: "div",
      props: {
        a: "1",
      },
      // children: "xxx",
      // children: [{ tag: "div", props: {}, children: "xxxxx" }],
      children: [h("p", {}, "1"), h("p", {}, "2")],
    });

    window.state = state;

    return { state };
  },
};
