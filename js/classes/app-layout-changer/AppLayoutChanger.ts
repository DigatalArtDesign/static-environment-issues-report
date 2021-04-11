import { ChangeClass } from "../../interfaces/elementable";
import { AppDivElementCreator } from "../app-element-creators/AppDivCreator";
import AppElementUI from "../AppElement";

export default abstract class AppLayoutChanger {
    protected objectHTMLElement: AppElementUI;
    protected divHTMLElement: AppElementUI;
    protected descriptionElement: AppElementUI;
    
    constructor(parentId: string) {
        this.divHTMLElement = new AppDivElementCreator().createElement(parentId, [{name: "class", value: "div-element-switcher opacity-off"}]);
    }


    abstract changeView();
    abstract renderElement();
    abstract watchElement();
    abstract changeDivClass(htmlClasses: string[], changeType: ChangeClass, replaceClasses?: string[]);
}