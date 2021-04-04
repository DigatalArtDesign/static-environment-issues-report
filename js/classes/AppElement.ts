import { ChangeableDOM } from "../interfaces/changeElements";
import { Attr, Elementable } from "../interfaces/elementable";
import { Renderable } from "../interfaces/renderElement";


export default class AppElementUI implements Elementable, Renderable, ChangeableDOM {
    public tag: string;
    public id: string; 
    public class: string[];
    public parentElementId: string;
    public innerHtml: string;
    public attributes: Attr[]; 
    constructor(props: Elementable, renderImmediate = false) {
        Object.keys(props).map((i) => {
            this[i] = props[i];
        }); 

        if (renderImmediate) {
            this.renderElement();
        }
    }

    renderElement(): void {
        const parent = document.getElementById(this.parentElementId);
        if(!parent) {
            throw new Error("Please provide parent id first");
        }
        const el = document.createElement(this.tag);
        el.id = this.id;
        if (this.class.length > 0) {
            this.class.map((i) => el.classList.add(i));   
        }
        if (this.attributes) {
            this.attributes.map((i) => el.setAttribute(i.name, i.value));
        }
        if (this.innerHtml) {
            el.innerHTML = this.innerHtml;
        }
        parent.appendChild(el);
    }
    
    unmountElement(): void {
        const el = document.getElementById(this.id);
        if (!el) {
            throw new Error("Unmount Error: No such element was rendered to DOM. Please double check that this element exist, or did not delete it before");
        }
        const parentEl = document.getElementById(this.parentElementId);
        parentEl.removeChild(el);
    }

    get mounted(): boolean {
        return !!document.getElementById(this.id);
    }

    changeInnerHtml(innerHTML: string) {
        const el = document.getElementById(this.id);
        if(!el) {
            throw new Error("Change Inner HTML Error: No such element was rendered to DOM. Please double check that this element exist, or did not delete it before");
        }
        this.innerHtml = innerHTML;
        el.innerHTML = this.innerHtml;
    }

    changeClasses(classes: string[]) {
        const el = document.getElementById(this.id);
        if(!el) {
            throw new Error("Change Inner HTML Error: No such element was rendered to DOM. Please double check that this element exist, or did not delete it before");
        }
        this.class = classes;
        el.removeAttribute("class");
        this.class.map((i) => el.classList.add(i));   
    } 

    changeAttribute(attrName: string, attrValue: string) {
        const el = document.getElementById(this.id);
        if(!el) {
            throw new Error("Change Inner HTML Error: No such element was rendered to DOM. Please double check that this element exist, or did not delete it before");
        }

        const attrIndex = this.attributes.findIndex(i => i.name === attrName);
        if(attrIndex === -1) {
            this.attributes.push({name: attrName, value: attrValue});    
        } else {
            this.attributes[attrIndex].value = attrValue;
        }
    }

    getInnerHtml() {
        return this.innerHtml;
    }
}