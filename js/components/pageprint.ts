import PagePrint, { ImageView } from "../classes/page-print/PagePrint";


document.addEventListener("DOMContentLoaded", () => {
    const image: ImageView = {
        tag: "span",
        imgAttr: [{name: "class", value: "print-image"}]
    };
    const pagePrint = new PagePrint("page-print", "Print page", true, image);
    pagePrint.render();
});
