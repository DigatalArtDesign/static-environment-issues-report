import { Attr } from "../interfaces/elementable";
import  AppElementUI from "../classes/AppElement";
import uuid from "uuid";

export default abstract class AppElementCreator {
    // eslint-disable-next-line no-unused-vars
    public abstract createElement(...args: [id: string, attributes?: Attr[], innerHTML?: string] | [id: string, innerHTML?: string]): AppElementUI;

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
