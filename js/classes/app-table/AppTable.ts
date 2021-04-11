import AppElementUI from "../AppElement";
import { TableElements, TableElementProps } from "../../interfaces/appTable";
import { AppTbCreator, AppTBodyCreator, AppTdCreator, AppThCreator, AppTHeadCreator, AppTrCreator } from "../app-element-creators/AppTableCreators";


export default class AppTable {
    private calculateElements(parentId: string, elem: TableElementProps[]) {
        elem.map((element) => {
            switch(element.elem) {
                case TableElements.T_BODY: {
                    const tbody = new AppTBodyCreator();
                    const el = tbody.createElement(parentId, element.attributes);
                    el.renderElement();
                    this.tbody.push(el);
                    if (typeof element.content !== "string") {
                        this.calculateElements(el.id, element.content);
                    }
                    break;
                }
                case TableElements.T_HEAD: {
                    const thead = new AppTHeadCreator();
                    const el = thead.createElement(parentId, element.attributes);
                    el.renderElement();
                    this.tbody.push(el);
                    if (typeof element.content !== "string") {
                        this.calculateElements(el.id, element.content);
                    }
                    break;
                }
                case TableElements.TR: {
                    const tr = new AppTrCreator();
                    const el = tr.createElement(parentId, element.attributes);
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
                        const el = th.createElement(parentId,  element.attributes, element.content);
                        el.renderElement();
                        this.ths.push(el);
                        return;
                    }
                    break;
                }
                default: {
                    if (typeof element.content === "string") {
                        const td = new AppTdCreator();
                        const el = td.createElement(parentId,  element.attributes, element.content);
                        el.renderElement();
                        this.tds.push(el);
                        return;
                    } else {
                        const td = new AppTdCreator();
                        const el = td.createElement(parentId,  element.attributes);
                        el.renderElement();
                        this.tds.push(el);
                        this.calculateElements(el.id, element.content);
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
        const { parentId, content, attributes } = props;
        const table = new AppTbCreator();
        this.table = table.createElement(parentId, attributes);
        this.table.renderElement();
        if (typeof content !== "string") {
            this.calculateElements(this.table.id, content);   
        }
    }

    public getHeadText(): string[] {
        return this.ths.map(i => i.innerHtml);
    }

    public getColumnsHTMLCollection() {
        return this.getColumns().map(i => document.getElementById(i.id));
    }

    public getRowsHTMLCollection() {
        return this.getRows().map(i => document.getElementById(i.id));
    }

    public getHeadHTMLCollection() {
        return this.ths.map(i => document.getElementById(i.id));
    }

    public getColumns() {
        return (this.tds.filter( i => this.trs.map(i => i.id).includes(i.parentElementId) && i.innerHtml === undefined));
    }

    public getRows() {
        return (this.tds.filter( i => this.trs.map(i => i.id).includes(i.parentElementId) && i.innerHtml !== undefined));
    }

    public getTrs() {
        return this.trs;
    }

    public getBodyElements(): string[][] {
        const tdsParentIDs = this.trs.map(i => i.id);
        const tdsFiltered = tdsParentIDs.map(i => this.tds.filter(l => l.parentElementId === i));
        console.log(tdsParentIDs);
        return tdsFiltered.map(i => i.map(l => l.innerHtml)).map(i => i.filter(l => l !== undefined)).filter(i => i.length > 0);
    }
}
