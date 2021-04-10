import AppLayoutChanger from "./AppLayoutChanger";
import { AppObjectCreator } from "../app-element-creators/AppObjectCreator";
import { AppSpanElementCreator } from "../app-element-creators/AppSpanElementCreator";
import { Attr } from "../../interfaces/elementable";
import axios from "axios";

export interface AppLayoutContractProps {
    parentId: string; 
    innerHtml: string;
    object: false | {
        srcData: string;
    };
    contastUrl: string;
}

export default class AppLayoutContrast extends AppLayoutChanger {
    private _isContrastMode: boolean = false;
    private hrefContrast: string;
    private hasObjectHtml = false;

    constructor(props: AppLayoutContractProps) {
        super(props.parentId);
        if (props.object) {
            this.hasObjectHtml = true;
            const attr: Attr[] = [{name: "class", value: "object-class"}, {name: "data", value: props.object.srcData}];
            this.objectHTMLElement = new AppObjectCreator().createElement(this.divHTMLElement.id, attr);
        }
        this.descriptionElement = new AppSpanElementCreator(false).createElement(this.divHTMLElement.id, props.innerHtml); 
        this.hrefContrast = props.contastUrl;
        this._isContrastMode = Boolean(window.localStorage.getItem("isContractMode") === "true");
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

    watchElement() {
        this.divHTMLElement.listenEvent("click", async () => {
            this._isContrastMode = !this._isContrastMode;
            await this.changeView();
            window.localStorage.setItem("isContractMode", String(this._isContrastMode));
        });
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