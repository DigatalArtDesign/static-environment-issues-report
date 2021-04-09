import { Elementable, Attr } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";
import uuid from "uuid";

export class AppDivElementCreator extends AppElementCreator {
    createElement(id: string, attr: Attr[]): AppElementUI {
        const props: Elementable = {
            tag: "div",
            id: uuid(), 
            class: ["div-element"],
            parentElementId: id,
            attributes: attr
        };

        return new AppElementUI(props);
    }
} 