export enum TableElements {
    TD = "td",
    TH = "th",
    TR = "tr",
    TABLE = "table",
    T_BODY = "tbody",
    T_HEAD = "thead",
    COL_GROUP = "colgroup",
    COL = "col",
    CAPTION = "caption"
}


export interface TableElementProps {
    parentId?: string;
    elem: TableElements,
    content: (string[] | TableElementProps[])   
}


export function instanceofElement(obj: any, type: TableElements): boolean {
    return obj.elem === type;
}
