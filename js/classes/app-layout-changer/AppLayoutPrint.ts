import { AppObjectCreator } from "../app-element-creators/AppObjectCreator";
import { AppSpanElementCreator } from "../app-element-creators/AppSpanElementCreator";
import AppLayoutChanger from "./AppLayoutChanger";
import { Attr, ChangeClass } from "../../interfaces/elementable";
import { simulatePrintMedia, restoreScreenMedia } from "../../utils/printCssToggle";
import { AppViewModes } from "../../interfaces/viewModes";
import appSettings from "../AppSettings";


export interface AppLayoutPrintProps {
    parentId: string; 
    innerHtml: [string, string];
    object: false | {
        srcData: string;
    };
}

export default class AppLayoutPrint extends AppLayoutChanger {
    private _isPrintMode = false;
    private hasObjectHtml = false;
    private descriptioninnerHTML: [string, string];


    constructor(props: AppLayoutPrintProps) {
        super(props.parentId);
        this.descriptioninnerHTML = props.innerHtml;
        if (props.object) {
            this.hasObjectHtml = true;
            const attr: Attr[] = [{name: "class", value: "object-class"}, {name: "data", value: props.object.srcData}];
            this.objectHTMLElement = new AppObjectCreator().createElement(this.divHTMLElement.id, attr);
        }
        this.setPrintMode(appSettings.currentMode);
        this.descriptionElement = new AppSpanElementCreator(false).createElement(this.divHTMLElement.id, this._isPrintMode ? props.innerHtml[1] : props.innerHtml[0]); 
    }

    setPrintMode(mode: AppViewModes) {
        this._isPrintMode = mode === AppViewModes.PRINT;
    }

    get isPrintMode() {
        return this._isPrintMode;
    }

    renderElement() {
        this.divHTMLElement.renderElement();
        if (this.hasObjectHtml) {
            this.objectHTMLElement.renderElement();
        }

        this.descriptionElement.renderElement();
    }

    watchElement(callback?: (printMode?: boolean) => void) {
        if (!this.divHTMLElement.mounted || !this.descriptionElement.mounted && !this.descriptionElement.mounted) {
            console.error("Elements are not in the DOM, or were unmounted from there. Please consider render them first");
            return;
        }
        console.log(this.isPrintMode);
        this.divHTMLElement.listenEvent("click", async () => {
            this._isPrintMode = !this._isPrintMode;
            this.changeView();
            appSettings.currentMode = this._isPrintMode ? AppViewModes.PRINT : AppViewModes.STANDARD;
            if (callback) {
                callback(this._isPrintMode);
            }
            if (!this._isPrintMode) {
                this.descriptionElement.changeInnerHtml(this.descriptioninnerHTML[0]);
            } else {
                this.descriptionElement.changeInnerHtml(this.descriptioninnerHTML[1]);
            }
        });
    }

    changeViewDirect(mode: AppViewModes) {
        this.setPrintMode(mode);
        window.localStorage.setItem("isPrintMode", String(this._isPrintMode));
        this.changeView();
    }

    changeView() {
        if (this._isPrintMode) {
            simulatePrintMedia();
        } else if (!this._isPrintMode) {
            restoreScreenMedia();
        }
    }

    changeDescriptionText(innerHTML: string) {
        this.descriptionElement.changeInnerHtml(innerHTML);
    }

    unmountElement() {
        this.descriptionElement.unmountElement();
        if (this.hasObjectHtml) {
            this.objectHTMLElement.unmountElement();
        }
        this.divHTMLElement.unmountElement();
    }

    changeDivClass(htmlClasses: string[], changeType: ChangeClass, replaceClasses?: string[]) {
        this.divHTMLElement.changeClasses(htmlClasses, changeType, replaceClasses);
    }
}