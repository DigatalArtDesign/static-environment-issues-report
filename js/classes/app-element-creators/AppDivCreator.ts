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
        const classes = attr.length > 0 ? attr.find(i => i.name === "class").value.split(" ").concat(["div-element"]) : ["div-element"];
        const attrs =  attr.length  > 0 ? attr.filter(i => i.name !== "class") : attr;
        const props: Elementable = {
            tag: "div",
            id: uuid(), 
            class: classes,
            parentElementId: id,
            attributes: attrs
        };

        return new AppElementUI(props, this.renderImmediate, this.insertBefore);
    }
} 