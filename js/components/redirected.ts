import { api } from "../api/api";
import AppTable from "../classes/AppTable";
import { TableElements } from "../interfaces/appTable"; 

document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("formItem"));
    console.log(data);

    api.loadReports().then(reports => console.log(reports));

    const appTable = new AppTable({
        parentId: "table-section",
        elem: TableElements.TABLE,
        content: [
            {
                elem: TableElements.TR,
                content: [
                    {
                        elem: TableElements.TD,
                        content: "Simple Text"
                    },
                    {
                        elem: TableElements.TD,
                        content: "Simple Text"
                    },
                    {
                        elem: TableElements.TD,
                        content: "Simple Text"
                    },
                ]
            }
        ]
    });
    console.log(appTable);
});