import { Elementable, Attr, InsertBefore } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppDivElementCreator extends AppElementCreator {
    insertBefore: InsertBefore;
    renderImmediate: boolean;
    constructor(renderImmediate = false, insertBefore: InsertBefore = false) {
        super();
        this.insertBefore = insertBefore;
        this.renderImmediate = renderImmediate;
    }

    createElement(id: string, attr: Attr[]): AppElementUI {
        const props: Elementable = {
            tag: "div",
            id: uuid(), 
            class: ["div-element"],
            parentElementId: id,
            attributes: attr
        };

        return new AppElementUI(props, this.renderImmediate, this.insertBefore);
    }
} 