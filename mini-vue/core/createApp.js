import { effectWatch, mountElement, diff } from "./index.js";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup();
      let isMounted = false;
      let oldSubTree = null;
      effectWatch(() => {
        if (!isMounted) {
          isMounted = true;
          rootContainer.textContent = "";
          const subTree = rootComponent.render(setupResult);
          oldSubTree = subTree;
          mountElement(subTree, rootContainer);
        } else {
          const newSubTree = rootComponent.render(setupResult);
          diff(oldSubTree, newSubTree);
          oldSubTree = newSubTree;
        }
      });
    },
  };
}
