export interface Attr {
    name: string;
    value: string;
}

export interface Elementable {
    tag: string;
    id: string;
    class: string[];
    parentElementId: string;
    innerHtml?: string;
    attributes?: Attr[];
}