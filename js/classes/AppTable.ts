import { Elementable } from "../interfaces/elementable";
import AppElementUI from "./AppElement";
import AppElementCreator from "./ElementCreator";
import uuid from "uuid";
import { TableElements, TableElementProps } from "../interfaces/appTable";

export class AppTrCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TR,
            class: [],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: []
        };
        return new AppElementUI(props);
    }
}


export class AppTdCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TD,
            class: [],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: []
        };
        return new AppElementUI(props);
    }
}

export class AppTbCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TABLE,
            class: [],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: []
        };
        return new AppElementUI(props);
    }
}

export default class AppTable {
    private calculateElements(parentId: string, elem: TableElementProps[]) {
        elem.map((element) => {
            if (typeof element.content === "string") {
                const td = new AppTdCreator();
                const el = td.createElement(parentId, element.content);
                el.renderElement();
                this.tds.push(el);
                return;
            }
    
            switch(element.elem) {
                case TableElements.TR: {
                    const tr = new AppTrCreator();
                    const el = tr.createElement(parentId);
                    el.renderElement();
                    this.trs.push(el);
                    if (typeof element.content !== "string") {
                        this.calculateElements(el.id, element.content);
                    }
                    break;
                }
                default: return;
            }
            return;
        });
    }

    public table: AppElementUI;
    public tds: AppElementUI[] = [];
    public trs: AppElementUI[] = []; 
    
    constructor(props: TableElementProps) {
        const { parentId, content } = props;
        const table = new AppTbCreator();
        this.table = table.createElement(parentId);
        this.table.renderElement();
        if (typeof content !== "string") {
            this.calculateElements(this.table.id, content);   
        }
    }
}
