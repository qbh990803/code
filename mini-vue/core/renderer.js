function createElement(tag) {
  return document.createElement(tag);
}

function patchProps(el, key, prevValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function insert(el, parent) {
  parent.append(el);
}

function replaceText(text, parent) {
  parent.innerText = text;
}

function remove(el, parent) {
  parent.removeChild(el);
}

export function mountElement(vnode, container) {
  const { tag, props, children } = vnode;

  // 创建元素
  const el = (vnode.el = createElement(tag));

  // 设置元素属性
  for (const key in props) {
    const val = props[key];
    patchProps(el, key, null, val);
  }

  // 添加children
  // string || array
  if (typeof children === "string") {
    insert(createTextNode(children), el);
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      mountElement(v, el);
    });
  }

  insert(el, container);
}

// n1 => oldVNode
// n2 => newVNode
export function diff(n1, n2) {
  // tag
  // el.replaceWith(element)
  if (n1.tag !== n2.tag) {
    // TODO 只能替换一次，第二次n1.el为undefined
    n1.el.replaceWith(createElement(n2.tag));
  } else {
    // props
    // 1.
    // newProps {a: 2, b: 2}
    // oldProps {a: 1}
    // r => 更新a,添加b
    // 2
    // newProps {b: 2}
    // oldProps {a: 1}

    const newProps = n2.props;
    const oldProps = n1.props;
    const el = (n2.el = n1.el);
    if (newProps) {
      for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
          patchProps(el, key, null, newProps[key]);
        }
      }
    }

    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null);
        }
      }
    }

    // children
    // 1. string array
    // 2. string string
    // 3. array array
    // 4. array string
    const oldChildren = n1.children;
    const newChildren = n2.children;

    if (typeof newChildren === "string" || typeof newChildren === "number") {
      if (newChildren !== oldChildren) replaceText(newChildren, el);
    } else {
      if (Array.isArray(oldChildren)) {
        // 1.依次对比
        // 2. newProps > oldProps add
        // newProps: [a, b, c]
        // oldProps: [a, b]
        // 3. newProps < oldProps delete
        // newProps: [ a, b]
        // oldProps: [ a, b, c]

        const length = Math.min(oldChildren.length, newChildren.length);

        for (let index = 0; index < length; index++) {
          diff(oldChildren[index], newChildren[index]);
        }

        if (newChildren.length > length) {
          for (let index = length; index < newChildren.length; index++) {
            const vnode = newChildren[index];

            mountElement(vnode, el);
          }
        }

        if (oldChildren.length > length) {
          for (let index = length; index < oldChildren.length; index++) {
            const vnode = oldChildren[index];

            remove(vnode.el, el);
          }
        }
      } else if (typeof oldChildren === "string") {
        el.innerText = "";
        newChildren.forEach((v) => {
          mountElement(v, el);
        });
      }
    }
  }
}
