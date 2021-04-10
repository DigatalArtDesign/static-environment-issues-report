import AppLayoutContrast, { AppLayoutContractProps } from "../classes/app-layout-changer/AppLayoutContrast";
// @ts-ignore
import constractCss from "url:./../../css/contrast.css";
// @ts-ignore
import sImage from "url:./../../img/s.svg";
import { AppObjectCreator } from "../classes/app-element-creators/AppObjectCreator";
import { AppDivElementCreator } from "../classes/app-element-creators/AppDivCreator";
import { printMain } from "./pageprint";
import AppLayoutPrint, { AppLayoutPrintProps } from "../classes/app-layout-changer/AppLayoutPrint";


document.addEventListener("DOMContentLoaded", () => {
    const appLayoutProps: AppLayoutContractProps = {
        parentId: "layout",
        innerHtml: "Contast Mode",
        object: false,
        contastUrl: constractCss
    };

    const appPrintProps: AppLayoutPrintProps = {
        parentId: "layout",
        innerHtml: "Print Mode",
        object: false,
    };

    // image 
    const sImageDiv = new AppDivElementCreator(true).createElement(appLayoutProps.parentId, [{name: "class", value: "s-icon-wrapper"}]);
    new AppObjectCreator(true).createElement(sImageDiv.id, [{name: "data", value: sImage}, {name: "width", value: "24"}, {name: "height", value: "31"}]);
    
    // print layout
    const printLayout = new AppLayoutPrint(appPrintProps);
    printLayout.watchElement();

    // contract layout
    const appLayout = new AppLayoutContrast(appLayoutProps);
    appLayout.watchElement();
    
    printMain();
});