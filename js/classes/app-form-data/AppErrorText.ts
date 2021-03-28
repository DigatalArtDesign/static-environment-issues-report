import { Elementable } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppErrorTextCreator extends AppElementCreator {
    public createElement(id: string, innerHTML: string): AppElementUI {
      const props: Elementable = {
        tag: "span",
        id: `error-${uuid()}`,
        class: "field-error".split(" "),
        innerHtml: innerHTML,
        parentElementId: id,
      };
  
      return new AppElementUI(props);
    }
}

export default class AppErrorText {
    private error: AppElementUI
    hasMounted;

    constructor(parentId: string, innerHtml: string) {
        this.error = new AppErrorTextCreator().createElement(parentId, innerHtml);
    }

    mountElement() {
        if (!this.hasMounted) {
            this.error.renderElement();
            this.hasMounted = true;
        }
    }

    unmountElement() {
        if(this.hasMounted) {
            this.error.unmountElement();
            this.hasMounted = false;
        }
    }
}