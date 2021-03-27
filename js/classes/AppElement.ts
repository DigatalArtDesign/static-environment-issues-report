import { Elementable } from "../interfaces/elementable";
import { Renderable } from "../interfaces/renderElement";


export default class AppElementUI implements Elementable, Renderable {
    public tag;
    public id; 
    public class;
    public parentElementId;
    public innerHtml;
    public attributes; 
    constructor(props: Elementable, renderImmediate = false) {
        Object.keys(props).map((i) => {
            this[i] = props[i];
        }); 

        if (renderImmediate) {
            this.renderElement();
        }
    }

    renderElement(): void {
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
        const parent = document.getElementById(this.parentElementId);
        parent.appendChild(el);
    }

    getInnerHtml() {
        return this.innerHtml;
    }
}