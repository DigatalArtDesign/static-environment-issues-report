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
    private isContactMode: boolean = false;
    private hrefContrast: string;
    constructor(props: AppLayoutContractProps) {
        super(props.parentId);
        if (props.object) {
            const attr: Attr[] = [{name: "class", value: "object-class"}, {name: "data", value: props.object.srcData}];
            this.objectHTMLElement = new AppObjectCreator().createElement(this.divHTMLElement.id, attr);
        }
        this.descriptionElement = new AppSpanElementCreator(true).createElement(this.divHTMLElement.id, props.innerHtml); 
        this.hrefContrast = props.contastUrl;
        this.isContactMode = Boolean(window.localStorage.getItem("isContractMode"));
    }

    watchElement() {
        this.divHTMLElement.listenEvent("click", async () => {
            if (!this.isContactMode) {
                const css = await axios.get(this.hrefContrast);
                // console.log(css.data);
                const style = document.createElement("style");
                style.innerHTML = css.data;
                style.id = "contrast-style";
                document.getElementsByTagName("head")[0].appendChild(style);

                this.isContactMode = true;
                window.localStorage.setItem("isContractMode", "true");
            } else {
                const style = Array.from(document.getElementsByTagName("style")).findIndex(i => i.id === "contrast-style");
                if (style === -1) 
                {
                    throw new Error("Please condider addind constast style before deleting it");
                }
                document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("style")[style]);
                this.isContactMode = false;
                window.localStorage.setItem("isContractMode", "false");
            }  
        });
    }

    changeClass(htmlClasses: string[]) {
        this.objectHTMLElement.changeClasses(htmlClasses);
    }
}