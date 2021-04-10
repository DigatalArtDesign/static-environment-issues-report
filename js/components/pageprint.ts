/* eslint-disable no-undef */
import PagePrint, { WatchOnClickPrint } from "../classes/page-print/PagePrint";


export const printMain = () => {
    const body = document.getElementsByTagName("body");
    body[0].id = "body";
    const links = document.getElementsByTagName("link");

    // const image: ImageView = {
    //     tag: "span",
    //     imgAttr: [{name: "class", value: "print-image"}]
    // };

    let currentStyles = Array.from(links).filter(i => i.rel === "stylesheet").map(i => i.href); 

    const watchOptions: WatchOnClickPrint = {
        printElementId: "body",
        cssPaths: currentStyles
    };

    
    console.log(currentStyles);

    const pagePrint = new PagePrint("layout", "Print Page", watchOptions, false);
    pagePrint.render();
};

