import { App, DefineComponent, createVNode, render } from "vue";
import VueWindow from "./components/VueWindow.vue";

type VueComponent = DefineComponent<object, object, unknown>;

export default {
  install: (
    app: App<Element>,
    options: {
      windowComponent: VueComponent;
      windowManager: {
        windows: { ["string"]: { component: VueComponent } };
        activeWindows: VueComponent[];
      };
    }
  ) => {
    const container = document.body.appendChild(document.createElement("div"));
    container.classList.add("window-manager-container");

    app.config.globalProperties.$windowManager = options.windowManager;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const mount = (component: VueComponent, { props, element, app } = {}) => {
      let el = element;

      let vNode = createVNode(component, props);
      if (app && app._context) vNode.appContext = app._context;
      if (el) render(vNode, el);
      else if (typeof document !== "undefined")
        render(vNode, (el = document.createElement("div")));

      const destroy = () => {
        if (el) render(null, el);
        el = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        vNode = null;
      };

      return { vNode, destroy, el };
    };

    Object.keys(app.config.globalProperties.$windowManager.windows).forEach(
      (element: string) => {
        app.config.globalProperties.$windowManager.windows[element].show =
          () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const { el, vNode, destroy } = mount(VueWindow, {
              props: {
                component:
                  app.config.globalProperties.$windowManager.windows[element]
                    .component,
              },
            });
            container.appendChild(el);
          };
      }
    );
  },
};
