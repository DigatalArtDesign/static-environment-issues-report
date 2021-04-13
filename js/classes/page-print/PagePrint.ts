import printJS from "print-js";
import uuid from "uuid";
import { Attr, ChangeClass, Elementable } from "../../interfaces/elementable";
import { AppDivElementCreator } from "../app-element-creators/AppDivCreator";
import { AppSpanElementCreator } from "../app-element-creators/AppSpanElementCreator";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";

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

export interface WatchOnClickPrint {
    printElementId: string;
    cssPaths: string[];
}


export default class Print {
    private printElement: AppElementUI;
    private printButton: AppElementUI;
    private printImage: AppElementUI;
    private hasImage = false;
    private watchOnClickPrint: WatchOnClickPrint | false;
    private disableElements: string[]

    constructor(parentId: string, buttonText: string, watchOnClickPrint: WatchOnClickPrint | false = false , image: ImageView | boolean, disableElementClasses: string[]) {
        this.printElement = new AppDivElementCreator().createElement(parentId, [{name: "class", value: "div-element-switcher opacity-off"}]);
        this.printButton = new AppSpanElementCreator(false).createElement(this.printElement.id, buttonText);
        if (image && typeof image === "object") {
            this.hasImage = true;
            this.printImage = new PrintImageCreator().createElement(this.printElement.id, image.tag, image.imgAttr);
        }
        this.watchOnClickPrint = watchOnClickPrint;
        this.disableElements = disableElementClasses;
    }

    public render() { 
        try {
            this.printElement.renderElement();
            this.printButton.renderElement();
            if (this.hasImage) {
                this.printImage.renderElement();
            }

            if (typeof this.watchOnClickPrint === "object") {
                this.watchClick();
            }

        } catch (e) {
            console.error(e);
        }
        
    }

    changeDivClass(classes: string[], changeType: ChangeClass, replaceClasses: string[]) {
        this.printElement.changeClasses(classes, changeType, replaceClasses);
    }

    public unrender() {
        try {
            if (typeof this.watchOnClickPrint === "object") {
                this.unWatchClick();
            }
            this.printButton.unmountElement();
            if (this.hasImage) {
                this.printImage.unmountElement();
            }
            this.printElement.unmountElement();
        } catch (e) {
            console.error(e);
        }
    }

    public watchClick = () => {
        document.getElementById(this.printElement.id).addEventListener("click", () => {
            if (this.disableElements.length > 0) {
                this.disableElements.map(i => Array.from(document.getElementsByClassName(i)).map(i => (i as HTMLElement).style.display = "none"));
            }
            this.printPage();
            if (this.disableElements.length > 0) {
                this.disableElements.map(i => Array.from(document.getElementsByClassName(i)).map(i => (i as HTMLElement).style.display = "initial"));
            }
        });
    }

    public unWatchClick = () => {
        document.getElementById(this.printElement.id).removeEventListener("click", () => {
            this.printPage();
        });
    }

    printPage(printOptions?: WatchOnClickPrint) {
        if (this.printButton.mounted && typeof this.watchOnClickPrint === "object") {
            printJS({
                printable: (this.watchOnClickPrint).printElementId,
                css: (this.watchOnClickPrint).cssPaths,
                type: "html",
                scanStyles: false
            });
        } else if((this.printButton.mounted && typeof printOptions === "object")) {
            printJS({
                printable: (printOptions).printElementId,
                css: (printOptions).cssPaths,
                type: "html",
                scanStyles: false
            });
        } else {
            console.error("Render your element first");
        }
    } 
}


