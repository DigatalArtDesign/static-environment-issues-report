import { Elementable, Attr } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppObjectCreator extends AppElementCreator {
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

        return new AppElementUI(props, true);
    }
}