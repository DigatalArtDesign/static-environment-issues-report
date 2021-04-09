import { AppDivElementCreator } from "../app-element-creators/AppDivCreator";
import AppElementUI from "../AppElement";

export default abstract class AppLayoutChanger {
    protected objectHTMLElement: AppElementUI;
    protected divHTMLElement: AppElementUI;
    protected descriptionElement: AppElementUI;
    
    constructor(parentId: string) {
        this.divHTMLElement = new AppDivElementCreator().createElement(parentId, []);
    }

    abstract watchElement();
    abstract changeClass(htmlClasses: string[]);
}