import { Elementable, Attr, InsertBefore } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppObjectCreator extends AppElementCreator {
    insertBefore: InsertBefore;
    renderImmediate: boolean;
    constructor(renderImmediate = false, insertBefore: InsertBefore = false) {
        super();
        this.insertBefore = insertBefore;
        this.renderImmediate = renderImmediate;
    }
    createElement(id: string, attr: Attr[]): AppElementUI {
        const classes = attr.filter(i => i.name === "class").map(i => i.value);
        const attrs = attr.filter(i => i.name !== "class");
        const props: Elementable = {
            tag: "object",
            id: uuid(), 
            class: classes,
            parentElementId: id,
            attributes: attrs
        };
        return new AppElementUI(props, this.renderImmediate, this.insertBefore);
    }
}