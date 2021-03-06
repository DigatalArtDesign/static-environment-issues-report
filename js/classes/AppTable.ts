import { Elementable } from "../interfaces/elementable";
import AppElementUI from "./AppElement";
import AppElementCreator from "./ElementCreator";
import uuid from "uuid";
import { TableElements, TableElementProps, instanceofElement } from "../interfaces/appTable";

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



interface AppTd {
    element: AppElementUI;
    children: string[];
}

interface AppTr {
    element: AppElementUI;
    children: AppTd[];
}

interface AppTb {
    element: AppElementUI;
    children: AppTr[];
} 

export default class AppTable {
    public table!: AppTb;

    private computeToElement(parentId: string, elem: TableElementProps) {
        if (typeof elem.content === "string") {
            const strs = elem.content as string[];
            const appTds: AppTd[] = [];
            for(const str of strs) {
                const appTd = new AppTdCreator();
                const element = appTd.createElement(parentId, str);
                appTds.push({element: element, children: strs});
            }
            return appTds;
        } else {
            if (instanceofElement(elem.content, TableElements.TR)) {
                const contents = elem.content as TableElementProps[];
                const appTrs: AppTr[] = [];
                for(const content of contents) {
                    const appTr = new AppTrCreator();
                    const element = appTr.createElement(parentId);
                    const children: AppTd[] = this.computeToElement(element.id, content) as AppTd[];
                    appTrs.push({element: element, children: children});
                }
                return appTrs;
            } else if(instanceofElement(elem.content, TableElements.TABLE)) {
                const contents = elem.content as TableElementProps[];
                const appTbs: AppTb[] = [];
                for(const content of contents) {
                    const appTr = new AppTbCreator();
                    const element = appTr.createElement(parentId);
                    const children: AppTr[] = this.computeToElement(element.id, content) as AppTr[]; 
                    appTbs.push({element: element, children: children});
                }
                return;
            }
        }
    }
    
    constructor(props: TableElementProps) {
        this.table.element = new AppTbCreator();
        this.table.element.createElement(props.parentId);
        this.table.children = this.computeToElement(props.parentId, props);
    }
}
