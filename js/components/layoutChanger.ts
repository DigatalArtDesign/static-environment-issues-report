import AppLayoutContrast, { AppLayoutContractProps } from "../classes/app-layout-changer/AppLayoutContrast";


document.addEventListener("DOMContentLoaded", () => {
    const appLayoutProps: AppLayoutContractProps = {
        parentId: "layout",
        innerHtml: "Switch to contast mode",
        object: false,
        contastUrl: "",
    };
    const appLayout = new AppLayoutContrast(appLayoutProps);
    appLayout.watchElement();
});