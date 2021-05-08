export interface Renderable {
    renderElement(): void;
    unmountElement(): void;
}