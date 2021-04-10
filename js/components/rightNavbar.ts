import {AppObjectCreator} from "../classes/app-element-creators/AppObjectCreator";
/* eslint-disable import/no-unresolved */
// @ts-ignore
import closeSvg from "url:../../img/close.svg";
import { AppDivElementCreator } from "../classes/app-element-creators/AppDivCreator";

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const navbar = document.getElementById("nav-bar");
    
    const closeIconWrapper = new AppDivElementCreator(true, true).createElement(navbar.id, [{name: "class", value: "close-icon-wrapper"}]);
    const closeIconDiv = new AppDivElementCreator(true).createElement(closeIconWrapper.id, [{name: "class", value: "close-icon-clicker"}]);
    new AppObjectCreator(true).createElement(closeIconDiv.id, [{name: "data", value: closeSvg }, { name: "class", value: "close-icon" }]);
    closeIconDiv.listenEvent("click", () => {
        navbar.classList.remove("enter");
    });
    menu.addEventListener("click", () => {
        navbar.classList.add("enter");
    });
});