export interface ChangeableDOM {
    changeInnerHtml(innerHTML: string): void;
    changeClasses(classes: string[]): void;
    changeAttribute(attrName: string, attrValue: string): void;
}