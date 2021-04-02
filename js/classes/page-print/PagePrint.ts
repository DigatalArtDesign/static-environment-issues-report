import printJS from "print-js";
import uuid from "uuid";
import { Elementable } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";

class PrintAreaCreator extends AppElementCreator {
    createElement(id: string): AppElementUI {
        const props: Elementable = {
            tag: "div",
            id: uuid(), 
            class: ["print-wrapper"],
            parentElementId: id
        };

        return new AppElementUI(props);
    }
} 

class PrintButtonCreator extends AppElementCreator {
    createElement(id: string, innerHTML: string): AppElementUI {
        const props: Elementable = {
            tag: "button",
            id: uuid(), 
            class: ["print-button"],
            parentElementId: id,
            innerHtml: innerHTML
        };

        return new AppElementUI(props);
    }
} 


export default class Print {
    private printElement: AppElementUI;
    private printButton: AppElementUI;

    constructor(parentId: string, buttonText: string) {
        this.printElement = new PrintAreaCreator().createElement(parentId);
        this.printButton = new PrintButtonCreator().createElement(this.printElement.id, buttonText);
    }

    public render() { 
        try {
            this.printElement.renderElement();
            this.printButton.renderElement();
        } catch (e) {
            console.error(e);
        }
        
    }

    public unrender() {
        try {
            this.printElement.unmountElement();
            this.printElement.unmountElement();
        } catch (e) {
            console.error(e);
        }
    }

    printPage(filepath: string) {
        if (this.printButton.mounted) {
            printJS(filepath);
        } else {
            console.error("Render your element first");
        }
    } 
}


