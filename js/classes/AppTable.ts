import { Elementable } from "../interfaces/elementable";
import AppElementUI from "./AppElement";
import AppElementCreator from "./ElementCreator";
import uuid from "uuid";
import { TableElements, TableElementProps } from "../interfaces/appTable";

export class AppTbCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TABLE,
            class: ["table"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: []
        };
        return new AppElementUI(props);
    }
}

export class AppTBodyCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.T_BODY,
            class: ["table__body"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: []
        };
        return new AppElementUI(props);
    }
}

export class AppTHeadCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.T_HEAD,
            class: [],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: []
        };
        return new AppElementUI(props);
    }
}

export class AppThCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TH,
            class: ["table__head-element"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: []
        };
        return new AppElementUI(props);
    }
}

export class AppTrCreator extends AppElementCreator {
    public createElement(id: string, innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TR,
            class: ["table__head-tr"],
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
            class: ["table__body-element"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: [{name: "cellspacing", value: "15"}]
        };
        return new AppElementUI(props);
    }
}


export default class AppTable {
    private calculateElements(parentId: string, elem: TableElementProps[]) {
        elem.map((element) => {
            switch(element.elem) {
                case TableElements.T_BODY: {
                    const tbody = new AppTBodyCreator();
                    const el = tbody.createElement(parentId);
                    el.renderElement();
                    this.tbody.push(el);
                    if (typeof element.content !== "string") {
                        this.calculateElements(el.id, element.content);
                    }
                    break;
                }
                case TableElements.T_HEAD: {
                    const thead = new AppTHeadCreator();
                    const el = thead.createElement(parentId);
                    el.renderElement();
                    this.tbody.push(el);
                    if (typeof element.content !== "string") {
                        this.calculateElements(el.id, element.content);
                    }
                    break;
                }
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
                case TableElements.TH: {

                    if (typeof element.content === "string") {
                        const th = new AppThCreator();
                        const el = th.createElement(parentId, element.content);
                        el.renderElement();
                        this.tds.push(el);
                        return;
                    }
                    break;
                }
                default: {
                    if (typeof element.content === "string") {
                        const td = new AppTdCreator();
                        const el = td.createElement(parentId, element.content);
                        el.renderElement();
                        this.tds.push(el);
                        return;
                    }
                    break;
                }
            }
            return;
        });
    }

    public table: AppElementUI;
    public tbody: AppElementUI[] = [];
    public tds: AppElementUI[] = [];
    public trs: AppElementUI[] = []; 
    public ths: AppElementUI[] = [];
    
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
