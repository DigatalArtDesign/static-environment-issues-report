import printJS from "print-js";
import uuid from "uuid";
import { Attr, Elementable } from "../../interfaces/elementable";
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
            class: ["is-button-print"],
            parentElementId: id,
            innerHtml: innerHTML
        };

        return new AppElementUI(props);
    }
} 

class PrintImageCreator extends AppElementCreator {
    createElement(id: string, tag: string, attributes: Attr[]): AppElementUI {
        const props: Elementable = {
            tag: "span",
            id: uuid(), 
            class: ["print-image"],
            parentElementId: id,
            attributes: attributes
        };

        return new AppElementUI(props);
    }
} 

type ImageTag = "img" | "span"

export interface ImageView {
    tag: ImageTag;
    imgAttr: Attr[];
}


export default class Print {
    private printElement: AppElementUI;
    private printButton: AppElementUI;
    private printImage: AppElementUI;
    private hasImage = false;
    private watchClickImmediate = false;

constructor(parentId: string, buttonText: string, watchClickImmediate: boolean, image: ImageView | boolean) {
        this.printElement = new PrintAreaCreator().createElement(parentId);
        this.printButton = new PrintButtonCreator().createElement(this.printElement.id, buttonText);
        if (image && typeof image === "object") {
            this.hasImage = true;
            this.printImage = new PrintImageCreator().createElement(this.printElement.id, image.tag, image.imgAttr);
        }
        this.watchClickImmediate = watchClickImmediate;
    }

    public render() { 
        try {
            this.printElement.renderElement();
            this.printButton.renderElement();
            if (this.hasImage) {
                this.printImage.renderElement();
            }

            if (this.watchClickImmediate) {
                this.watchClick();
            }

        } catch (e) {
            console.error(e);
        }
        
    }

    public unrender() {
        try {
            this.printElement.unmountElement();
            this.printElement.unmountElement();
            if (this.hasImage) {
                this.printImage.unmountElement();
            }
        } catch (e) {
            console.error(e);
        }
    }

    public watchClick = () => {
        document.getElementById(this.printElement.id).addEventListener("click", () => {
            console.log("/dist" + window.location.pathname);
            this.printPage();
        });
    }

    printPage() {
        if (this.printButton.mounted) {
            printJS({
                printable: "body",
                type: "html",
                css: [
                  ],
                  scanStyles: false
            });
        } else {
            console.error("Render your element first");
        }
    } 
}


