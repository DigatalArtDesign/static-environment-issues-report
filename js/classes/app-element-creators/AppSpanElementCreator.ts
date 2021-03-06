import { Attr, Elementable } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppSpanElementCreator extends AppElementCreator {
    private renderImmediate = false;

    constructor(renderImmediate: boolean = true) {
        super();
        this.renderImmediate = renderImmediate;
    }
    
    createElement(id: string, innerHTML: string, attr?: Attr[]): AppElementUI {
        const props: Elementable = {
            tag: "span",
            id: uuid(), 
            class: ["app-span"],
            parentElementId: id,
            innerHtml: innerHTML,
            attributes: attr
        };

        return new AppElementUI(props, this.renderImmediate);
    }
}