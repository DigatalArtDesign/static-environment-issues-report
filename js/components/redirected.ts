import { api } from "../api/api";
import AppTable from "../classes/AppTable";
import { TableElements } from "../interfaces/appTable"; 
import FormData, {InjureType, InjuredFromAttack, AmountOfInjures} from "../classes/FormData";

enum ProgressType {
    PROCESSED = "In Process",
    SUCCESSED = "Success",
    FAILED = "Failed"
}

document.addEventListener("DOMContentLoaded", async () => {
    const lastReport: FormData = JSON.parse(localStorage.getItem("formItem"));
    const progressType: ProgressType = (new Date(lastReport.sentTime).getHours() - new Date().getHours()) > 2 ? ProgressType.SUCCESSED : ProgressType.PROCESSED;
    const problemTypes = {
        arson: "Arson",
        dump: "Dump",
        endangeredSpeciesPoaching: "Endangered Species Poahing",
        polutionAssault: "Polution Assault"

    };
    const amountOfInjures = {
        minor: "Minor",
        medium: "Medium",
        severe: "Severe"
    };

    const injuredFromAttack = {
        rareSpecies: "Rare species",
        ozoneLayer: "Ozone Layer",
        meanTemperature: "Mean temperaturess",
        plants: "Plants",
        rivers: "Rivers",
        lakes: "Lakes",
        soil: "Soil",
        cities: "Cities",
        other: "Other"
    };

    const findTrue = (elem: InjureType | AmountOfInjures): string => {
        const found = Object.keys(elem).find(i => elem[i] === true);
        if (!found) {
            console.log("Bad input. No true values were found. Function will throw the whole input!");
            return Object.values(elem)[1];
        }
        return found;
    };

    const filterTrue = (elem: InjuredFromAttack): string[] => {
        return Object.keys(elem).filter(i => elem[i] !== false);
    };
    
    const type = findTrue(lastReport.type);
    const problemType: string = problemTypes[type];
    const amountOfInjure: string = amountOfInjures[findTrue(lastReport.amountOfInjures)];
    const filteredAttacks: string[] = filterTrue(lastReport.injuredFromAttack); 
    const injured: string = filteredAttacks.length == 0 
    ? "Other"
    : Object.keys(injuredFromAttack).filter(i => filteredAttacks.includes(injuredFromAttack[i])).join(", ");

    const reports = await api.loadReports();
    console.log(reports);


    const guestReportTable = new AppTable({
        parentId: "table-section",
        elem: TableElements.TABLE,
        content: [
            {
                elem: TableElements.T_HEAD,
                content: [
                    {
                        elem: TableElements.TR,
                        content: [
                            {
                                elem: TableElements.TH,
                                content: "Current stage"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Problem type"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Severeness"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Injured"
                            }
                        ]
                    },
                ]
            },
            {
                elem: TableElements.T_BODY,
                content: [
                    {
                        elem: TableElements.TR,
                        content: [
                            {
                                elem: TableElements.TD,
                                content: progressType
                            },
                            {
                                elem: TableElements.TD,
                                content: problemType
                            },
                            {
                                elem: TableElements.TD,
                                content: amountOfInjure
                            },
                            {
                                elem: TableElements.TD,
                                content: injured
                            },
                        ]
                    }
                ]
            }
        ]
    });
    console.log(guestReportTable);
});