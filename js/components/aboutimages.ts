import { browserDetector } from "../utils/browserDetector";

document.addEventListener("DOMContentLoaded", () => {
    const browser = browserDetector();
    const svgImages = Array.from(document.getElementsByClassName("icon-img")) as Array<HTMLObjectElement>; 
    
    if (browser === "chrome" || browser === "safari") {
        for (const svgImage of svgImages) {
            const elem = document.createElement("img");
            elem.src = svgImage.data;
            elem.alt = "SVG image of Animal";
            Array.from(svgImage.classList).map(i => elem.classList.add(i));
            svgImage.parentNode.replaceChild(elem, svgImage);
        }
    }
});