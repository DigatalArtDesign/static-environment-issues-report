import { Elementable } from "../interfaces/elementable";
import Renderable from "../interfaces/renderElement";


export default class AppElementUI implements Elementable, Renderable {
    public tag;
    public id; 
    public class;
    public parentElementId;
    public innerHtml;
    public attributes; 
    constructor(props: Elementable) {
        Object.keys(this).map(i => this[i] = props[i]); 
    }

    renderElement(): void {
        const el = document.createElement(this.tag);
        el.id = this.id;
        this.class.map((i) => el.classList.add(i));
        if (this.attributes) {
            this.attributes.map((i) => el.setAttribute(i.name, i.value));
        }
        if (this.innerHtml) {
            el.innerHTML = this.innerHtml;
        }
        const parent = document.getElementById(this.parentElementId);
        parent.appendChild(el);
    }
}