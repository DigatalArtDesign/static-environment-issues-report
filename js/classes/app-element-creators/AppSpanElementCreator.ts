import { Elementable } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppSpanElementCreator extends AppElementCreator {
    private renderImmediate = false;

    constructor(renderImmediate?: boolean) {
        super();
        this.renderImmediate = renderImmediate;
    }
    
    createElement(id: string, innerHTML: string): AppElementUI {
        const props: Elementable = {
            tag: "span",
            id: uuid(), 
            class: ["app-span"],
            parentElementId: id,
            innerHtml: innerHTML
        };

        return new AppElementUI(props, this.renderImmediate);
    }
}