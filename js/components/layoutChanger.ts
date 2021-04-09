import AppLayoutContrast, { AppLayoutContractProps } from "../classes/app-layout-changer/AppLayoutContrast";
// @ts-ignore
import constractCss from "url:./../../css/contrast.css";


document.addEventListener("DOMContentLoaded", () => {
    const appLayoutProps: AppLayoutContractProps = {
        parentId: "layout",
        innerHtml: "Switch to contast mode",
        object: false,
        contastUrl: constractCss,
    };
    console.log(constractCss);
    const appLayout = new AppLayoutContrast(appLayoutProps);
    console.log(appLayout);
    appLayout.watchElement();
});