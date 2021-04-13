/* eslint-disable no-undef */
import PagePrint, { WatchOnClickPrint } from "../classes/page-print/PagePrint";


const printMain = (): PagePrint => {
    const body = document.getElementsByTagName("body");
    body[0].id = "body";
    const links = document.getElementsByTagName("link");

    let currentStyles = Array.from(links).filter(i => i.rel === "stylesheet").map(i => i.href); 

    const watchOptions: WatchOnClickPrint = {
        printElementId: "body",
        cssPaths: currentStyles
    };

    
    console.log(currentStyles);

    const disableElementsClasses = ["div-element-switcher"];

    const pagePrint = new PagePrint("layout", "Print Page", watchOptions, false, disableElementsClasses);
    pagePrint.render();


    return pagePrint;
};


export {
    printMain
};
