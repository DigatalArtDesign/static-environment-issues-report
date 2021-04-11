import uuid from "uuid";
import { TableElements } from "../../interfaces/appTable";
import { Elementable, Attr } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";

export class AppTbCreator extends AppElementCreator {
    public createElement(id: string, attributes?: Attr[], innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TABLE,
            class: ["table"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: attributes ? attributes : []
        };
        return new AppElementUI(props);
    }
}

export class AppTBodyCreator extends AppElementCreator {
    public createElement(id: string, attributes?: Attr[], innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.T_BODY,
            class: ["table__body"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: attributes ? attributes : []
        };
        return new AppElementUI(props);
    }
}

export class AppTHeadCreator extends AppElementCreator {
    public createElement(id: string, attributes?: Attr[], innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.T_HEAD,
            class: [],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: attributes ? attributes : []
        };
        return new AppElementUI(props);
    }
}

export class AppThCreator extends AppElementCreator {
    public createElement(id: string, attributes?: Attr[], innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TH,
            class: ["table__head-element"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: attributes ? attributes : []
        };
        return new AppElementUI(props);
    }
}

export class AppTrCreator extends AppElementCreator {
    public createElement(id: string, attributes?: Attr[], innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TR,
            class: ["table__head-tr"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: attributes ? attributes : []
        };
        return new AppElementUI(props);
    }
}


export class AppTdCreator extends AppElementCreator {
    public createElement(id: string, attributes?: Attr[], innerHTML?: string): AppElementUI {
        const props: Elementable =  {
            tag: TableElements.TD,
            class: ["table__body-element"],
            parentElementId: id,
            id: uuid(),
            innerHtml: innerHTML,
            attributes: attributes ? attributes : []
        };
        return new AppElementUI(props);
    }
}
