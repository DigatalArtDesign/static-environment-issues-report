import AppLayoutChanger from "./AppLayoutChanger";
import { AppObjectCreator } from "../app-element-creators/AppObjectCreator";
import { AppSpanElementCreator } from "../app-element-creators/AppSpanElementCreator";
import { Attr } from "../../interfaces/elementable";

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
    private hrefConrast: string;
    private hrefCurrect!: string;
    constructor(props: AppLayoutContractProps) {
        super(props.parentId);
        if (props.object) {
            const attr: Attr[] = [{name: "class", value: "object-class"}, {name: "data", value: props.object.srcData}];
            this.objectHTMLElement = new AppObjectCreator().createElement(this.divHTMLElement.id, attr);
        }
        this.descriptionElement = new AppSpanElementCreator().createElement(this.divHTMLElement.id, props.innerHtml); 
        this.hrefConrast = props.contastUrl;
    }

    watchElement() {
        this.divHTMLElement.listenEvent("click", () => {
            if (!this.isContactMode) {
                const link = document.createElement("link");
                link.href = this.hrefConrast;
                link.rel = "stylesheet";   

                document.getElementsByTagName("head")[0].appendChild(link);
                this.isContactMode = true;
            } else {
                const link = Array.from(document.getElementsByTagName("link")).findIndex(i => i.href === this.hrefConrast);
                if (link === -1) 
                {
                    throw new Error("Please condider addind constast style before deleting it");
                }
                document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("link")[link]);
            }  
        });
    }

    changeClass(htmlClasses: string[]) {
        this.objectHTMLElement.changeClasses(htmlClasses);
    }
}