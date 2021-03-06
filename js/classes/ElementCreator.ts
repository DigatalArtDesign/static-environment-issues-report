import { Elementable } from "../interfaces/elementable";
import uuid from "uuid";

export default abstract class AppElementCreator {
    // eslint-disable-next-line no-unused-vars
    public abstract createElement(id: string, innerHTML?: string): Elementable

    public toString(): string {
        const element = this.createElement(uuid());
        return (
            `id: ${element.id}\n` + 
            `tag: ${element.tag}}\n` + 
            element.attributes ?
            `attributes:  ${element.attributes.map((i, k, l) => k === l.length - 1 ? `${i}` : `${i}, `)}\n` : "attributes: none" +
            `classes: ${element.class.map((i, k, l) => k === l.length - 1 ? `${i}` : `${i}, `)}\n` +
            `parentId: ${element.parentElementId}}\n` +
            element.innerHtml ? 
            `innerHtml: ${element.innerHtml}}\n` : "innerHtml: none" 
        );
    }
}