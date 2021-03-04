import { api } from "../api/api";

document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("formItem"));
    console.log(data);

    api.loadReports().then(reports => console.log(reports));

});