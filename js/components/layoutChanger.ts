import AppLayoutContrast, { AppLayoutContractProps } from "../classes/app-layout-changer/AppLayoutContrast";
// @ts-ignore
import constractCss from "url:./../../css/contrast.css";
// @ts-ignore
import sImage from "url:./../../img/s.svg";
// @ts-ignore
import { AppObjectCreator } from "../classes/app-element-creators/AppObjectCreator";
import { AppDivElementCreator } from "../classes/app-element-creators/AppDivCreator";
import { printMain } from "./pageprint";
import AppLayoutPrint, { AppLayoutPrintProps } from "../classes/app-layout-changer/AppLayoutPrint";
import { AppSpanElementCreator } from "../classes/app-element-creators/AppSpanElementCreator";
import PagePrint from "../classes/page-print/PagePrint";
import { AppViewModes } from "../interfaces/viewModes";
import { ChangeClass } from "../interfaces/elementable";


document.addEventListener("DOMContentLoaded", async () => {
    let isSecondPhase = false;
    let pagePrint!: PagePrint;
    const animationTime = 500;

    const appLayoutProps: AppLayoutContractProps = {
        parentId: "layout",
        innerHtml: ["Contrast Mode", "Back to normal mode"],
        object: false,
        contastUrl: constractCss
    };

    const appPrintProps: AppLayoutPrintProps = {
        parentId: "layout",
        innerHtml: ["Print Mode", "Back to normal mode"],
        object: false,
    };

    function createIndexMainBackground() {
        if (!document.getElementsByClassName("main-content__index")[0]) {
            console.warn("no background change");
            return;
        }
        document.getElementsByClassName("main-content__index")[0].classList.remove("main-content-no-background");
    }

    function removeImageBackground() {
        if (!document.getElementsByClassName("main-content__index")[0]) {
            console.warn("no background change");
            return;
        }
        document.getElementsByClassName("main-content__index")[0].classList.add("main-content-no-background");
    }

    // print layout
    const printLayout = new AppLayoutPrint(appPrintProps);
    printLayout.changeView();
    // contract layout
    const appLayout = new AppLayoutContrast(appLayoutProps);
    await appLayout.changeView();

    const firstPhase = () => {
        // image 
        const sImageDiv = new AppDivElementCreator(true).createElement("layout", [{name: "class", value: "s-icon-wrapper"}]);
        const sImageObject = new AppObjectCreator(true).createElement(sImageDiv.id, [{name: "data", value: sImage}, {name: "width", value: "24"}, {name: "height", value: "31"}]);

    const spanElement = new AppSpanElementCreator(true).createElement("layout", "Change Apperarence", [{name: "class", value: "change-appearance"}]);
        removeImageBackground();
        spanElement.listenEvent("click", () => {
            sImageObject.unmountElement();
            sImageDiv.unmountElement();
            document.getElementById("layout").classList.remove("first-layout");
            
            const whiteBlock = document.getElementById("layout");
            whiteBlock.style.transition = `width ${animationTime / 1000}s`;
            spanElement.unmountElement();
            secondPhase();
            isSecondPhase = true;
        });
        document.getElementById("layout").classList.add("first-layout");
    };
    const secondPhase = () => {
        document.getElementById("layout").classList.add("second-layout");
    
        // image 
        const sImageDiv = new AppDivElementCreator(true, true).createElement(appLayoutProps.parentId, [{name: "class", value: "s-icon-wrapper"}]);
        const sImageObject = new AppObjectCreator(true, true).createElement(sImageDiv.id, [{name: "data", value: sImage}, {name: "width", value: "24"}, {name: "height", value: "31"}]);
        
        printLayout.renderElement();
        printLayout.watchElement((isPrintMode: boolean) => {
            if(isPrintMode) {
                appLayout.changeViewDirect(AppViewModes.PRINT);
            } 
            removeImageBackground();
        });
        appLayout.renderElement();
        appLayout.watchElement((isContrastMode: boolean) => {
            if (isContrastMode) {
                printLayout.changeViewDirect(AppViewModes.CONTRAST);
                createIndexMainBackground();
            } else {
                removeImageBackground();
            }
        });
        
        pagePrint = printMain();

        setTimeout(() => {
            pagePrint.changeDivClass(["opacity-on"], ChangeClass.REPLACE, ["opacity-off"]);
            appLayout.changeDivClass(["opacity-on"], ChangeClass.REPLACE, ["opacity-off"]);
            printLayout.changeDivClass(["opacity-on"], ChangeClass.REPLACE, ["opacity-off"]);
        }, animationTime);

        const goBack = () => {
           printLayout.changeDivClass(["opacity-off"], ChangeClass.REPLACE, ["opacity-on"]);
           appLayout.changeDivClass(["opacity-off"], ChangeClass.REPLACE, ["opacity-on"]);
           printLayout.unmountElement();
           appLayout.unmountElement();
           sImageObject.unmountElement();
           sImageDiv.unmountElement();
           if (!pagePrint) {
               console.error("Page print was not initialized");
           } else {
               pagePrint.unrender();
           }
           isSecondPhase = false;
           firstPhase();
        };

        sImageDiv.listenEvent("click", () => {  
           goBack();
        });
    };

    if (isSecondPhase || printLayout.isPrintMode || appLayout.isContrastMode) {
        secondPhase();
    } else {
        firstPhase();
    }
    
});