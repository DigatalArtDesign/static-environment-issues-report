import { ChangeClass } from "./elementable";

export interface ChangeableDOM {
    changeInnerHtml(innerHTML: string): void;
    changeClasses(classes: string[], changeType: ChangeClass, replaceClasses?: string[]): void;
    changeAttribute(attrName: string, attrValue: string): void;
}