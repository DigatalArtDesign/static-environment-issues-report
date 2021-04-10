import { AppObjectCreator } from "../app-element-creators/AppObjectCreator";
import { AppSpanElementCreator } from "../app-element-creators/AppSpanElementCreator";
import AppLayoutChanger from "./AppLayoutChanger";
import { Attr } from "../../interfaces/elementable";
import { simulatePrintMedia, restoreScreenMedia } from "../../utils/printCssToggle";


export interface AppLayoutPrintProps {
    parentId: string; 
    innerHtml: string;
    object: false | {
        srcData: string;
    };
}

export default class AppLayoutPrint extends AppLayoutChanger {
    private isPrintMode = false;


    constructor(props: AppLayoutPrintProps) {
        super(props.parentId);
        if (props.object) {
            const attr: Attr[] = [{name: "class", value: "object-class"}, {name: "data", value: props.object.srcData}];
            this.objectHTMLElement = new AppObjectCreator().createElement(this.divHTMLElement.id, attr);
        }
        this.descriptionElement = new AppSpanElementCreator(true).createElement(this.divHTMLElement.id, props.innerHtml); 
        this.isPrintMode = Boolean(window.localStorage.getItem("isPrintMode"));
    }

    watchElement() {
        this.divHTMLElement.listenEvent("click", async () => {
            if (!this.isPrintMode) {
                simulatePrintMedia();
                this.isPrintMode = true;
                window.localStorage.setItem("isPrintMode", "true");
            } else if (this.isPrintMode) {
                restoreScreenMedia();
                this.isPrintMode = false;
                window.localStorage.setItem("isPrintMode", "false");
            }
        });
    }

    changeClass(htmlClasses: string[]) {
        this.objectHTMLElement.changeClasses(htmlClasses);
    }
}