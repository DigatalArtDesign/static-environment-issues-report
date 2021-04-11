import AppLayoutChanger from "./AppLayoutChanger";
import { AppObjectCreator } from "../app-element-creators/AppObjectCreator";
import { AppSpanElementCreator } from "../app-element-creators/AppSpanElementCreator";
import { Attr } from "../../interfaces/elementable";
import axios from "axios";
import { ViewMode } from "../../interfaces/viewModes";

export interface AppLayoutContractProps {
    parentId: string; 
    innerHtml: [string, string];
    object: false | {
        srcData: string;
    };
    contastUrl: string;
}

export default class AppLayoutContrast extends AppLayoutChanger {
    private _isContrastMode: boolean = false;
    private hrefContrast: string;
    private hasObjectHtml = false;
    private descriptioninnerHTML: [string, string];

    constructor(props: AppLayoutContractProps) {
        super(props.parentId);
        this.descriptioninnerHTML = props.innerHtml;
        if (props.object) {
            this.hasObjectHtml = true;
            const attr: Attr[] = [{name: "class", value: "object-class"}, {name: "data", value: props.object.srcData}];
            this.objectHTMLElement = new AppObjectCreator().createElement(this.divHTMLElement.id, attr);
        }
        this._isContrastMode = Boolean(window.localStorage.getItem("isContrastMode") === "true");
        this.descriptionElement = new AppSpanElementCreator(false).createElement(this.divHTMLElement.id, this._isContrastMode ? props.innerHtml[1] : props.innerHtml[0]); 
        this.hrefContrast = props.contastUrl;
    }

    get isContrastMode() {
        return this._isContrastMode;
    }

    renderElement() {
        this.divHTMLElement.renderElement();
        if (this.hasObjectHtml) {
            this.objectHTMLElement.renderElement();
        }

        this.descriptionElement.renderElement();
    }

    watchElement(callback?: (contrastMode?: boolean) => void) {
        this.divHTMLElement.listenEvent("click", async () => {
            this._isContrastMode = !this._isContrastMode;
            await this.changeView();
            window.localStorage.setItem("isContrastMode", String(this._isContrastMode));
            if (callback) {
                callback(this._isContrastMode);
            }
            if (!this._isContrastMode) {
                this.descriptionElement.changeInnerHtml(this.descriptioninnerHTML[0]);
            } else {
                this.descriptionElement.changeInnerHtml(this.descriptioninnerHTML[1]);
            }
        });
    }

    changeViewDirect(mode: ViewMode) {
        this._isContrastMode = mode === ViewMode.CONTRAST;
        window.localStorage.setItem("isContrastMode", String(this._isContrastMode));
        if (!this._isContrastMode) {
            this.descriptionElement.changeInnerHtml(this.descriptioninnerHTML[0]);
        } else {
            this.descriptionElement.changeInnerHtml(this.descriptioninnerHTML[1]);
        }
        this.changeView();
    }

    async changeView() {
        if (this._isContrastMode) {
            const css = await axios.get(this.hrefContrast);
            // console.log(css.data);
            const style = document.createElement("style");
            style.innerHTML = css.data;
            style.id = "contrast-style";
            document.getElementsByTagName("head")[0].appendChild(style);
        } else {
            const style = Array.from(document.getElementsByTagName("style")).findIndex(i => i.id === "contrast-style");
            if (style === -1) 
            {
                console.warn("No contrast style");
                return;
            }
            document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("style")[style]);
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

    changeClass(htmlClasses: string[]) {
        this.objectHTMLElement.changeClasses(htmlClasses);
    }
}