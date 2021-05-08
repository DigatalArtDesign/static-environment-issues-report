import { Elementable, Attr } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppLinkElementCreator extends AppElementCreator {
    constructor() {
        super();
    }
    
    createElement(id: string, attr: Attr[], innerHTML: string): AppElementUI {
        const props: Elementable = {
            tag: "a",
            id: uuid(), 
            class: ["app-link"],
            parentElementId: id,
            innerHtml: innerHTML,
            attributes: attr
        };

        return new AppElementUI(props, true);
    }
}