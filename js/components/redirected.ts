import { api } from "../api/api";
import AppTable from "../classes/app-table/AppTable";
import { TableElements, TableElementProps } from "../interfaces/appTable"; 
import FormData from "../classes/app-form-data/FormData";
import InjuredFromAttack  from "../classes/app-form-data/InjuredFromAttack";
import InjureType from "../classes/app-form-data/InjureType";
import AmountOfInjures from "../classes/app-form-data/AmountOfInjures";
import downloadPdf from "../utils/createPdf";



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
        pollutionAssault: "Polution Assault"

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
            console.error("Bad input. No true values were found. Function will throw the whole input!");
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
    : filteredAttacks.join(", ");
    console.log(lastReport.injuredFromAttack, filteredAttacks, injured);

    const reports = await api.loadReports();
    const countElements = (key: string, element: string, countResponses = false) => {
        const reportsOnTime = countResponses ? reports.filter(i => {
            const time = i.sentTime / (1000 * 60 * 60);
            const now =  (new Date().getTime() / (1000* 60*60));
            return Math.ceil(now - time) > 2;
        }): reports; 
        return (reportsOnTime.map(i => i[key][element])).filter(i => i).length;
    };

    const impactPercentCount = (sent: number, responses: number) => {
        return sent === 0 ? "0%" : `${Math.round((responses / sent) * 100)}%`;
    };



    const guestReportTable = new AppTable({
        parentId: "table-report",
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

    const injuredElements: TableElementProps[] = Array(9).fill(0)
    .map((i, k) => ({elem: TableElements.TR, 
        content: [{elem: TableElements.TD ,
             content: Object.values(injuredFromAttack)[k]}, {elem: TableElements.TD , 
                content: String(countElements("injuredFromAttack", Object.keys(injuredFromAttack)[k]))}]}));

    const injuredResponses: TableElementProps[] = Array(9).fill(0)
    .map((i, k) => ({elem: TableElements.TR, 
        content: [{elem: TableElements.TD ,
             content: Object.values(injuredFromAttack)[k]}, {elem: TableElements.TD , 
                content: String(countElements("injuredFromAttack", Object.keys(injuredFromAttack)[k], true))}]}));

    const injuredImpact: TableElementProps[] = Array(9).fill(0)
    .map((i, k) => ({elem: TableElements.TR, 
        content: [{elem: TableElements.TD ,
                content: Object.values(injuredFromAttack)[k]}, {elem: TableElements.TD , 
                content: impactPercentCount(countElements("injuredFromAttack", Object.keys(injuredFromAttack)[k]), countElements("injuredFromAttack", Object.keys(injuredFromAttack)[k], true))}]}));

    const guestAttacksTable = new AppTable({
        parentId: "table-attacks",
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
                                content: "Attacks"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Request sent"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Request responses"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Impact"
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
                                content: "Attacks"
                            },
                            {
                                elem: TableElements.TD,
                                content: injuredElements
                            },
                            {
                                elem: TableElements.TD,
                                content: injuredResponses
                            },
                            {
                                elem: TableElements.TD,
                                content: injuredImpact
                            }
                        ]
                    }
                ]
            }
        ]
    });

    const typeElements: TableElementProps[] = Array(4).fill(0)
    .map((i, k) => ({
        elem: TableElements.TR, 
        content: [
            {
                elem: TableElements.TD ,
                content: Object.values(problemTypes)[k]
            }, 
            {
                elem: TableElements.TD , 
                content: String(countElements("type", Object.keys(problemTypes)[k]))
            }
        ]
    }));

    const typeResponses: TableElementProps[] = Array(4).fill(0)
    .map((i, k) => ({
        elem: TableElements.TR, 
        content: [
            {
                elem: TableElements.TD ,
                content: Object.values(problemTypes)[k]
            }, 
            {
                elem: TableElements.TD , 
                content: String(countElements("type", Object.keys(problemTypes)[k], true))
            }
        ]
    }));

    const typeImpact: TableElementProps[] = Array(4).fill(0)
    .map((i, k) => ({
        elem: TableElements.TR, 
        content: [
            {
                elem: TableElements.TD ,
                content: Object.values(problemTypes)[k]
            }, 
            {
                elem: TableElements.TD , 
                content: impactPercentCount(countElements("type", Object.keys(problemTypes)[k]), countElements("type", Object.keys(problemTypes)[k], true))
            }
        ]
    }));

    const guestTypeTable = new AppTable({
        parentId: "table-problem-types",
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
                                content: "Type"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Request sent"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Request responses"
                            },
                            {
                                elem: TableElements.TH,
                                content: "Impact"
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
                                content: "Type"
                            },
                            {
                                elem: TableElements.TD,
                                content: typeElements
                            },
                            {
                                elem: TableElements.TD,
                                content: typeResponses
                            },
                            {
                                elem: TableElements.TD,
                                content: typeImpact
                            }
                        ]
                    }
                ]
            }
        ]
    });

    const severenessElements: TableElementProps[] = Array(3).fill(0)
    .map((i, k) => ({
        elem: TableElements.TR, 
        content: [
            {
                attributes: [{name: "head-connect", value: "column-one" }],
                elem: TableElements.TD ,
                content: Object.values(amountOfInjures)[k]
            }, 
            {
                attributes: [{name: "head-connect", value: "column-one" }],
                elem: TableElements.TD , 
                content: String(countElements("amountOfInjures", Object.keys(amountOfInjures)[k]))
            }
        ]
    }));

    const severenessResponses: TableElementProps[] = Array(3).fill(0)
    .map((i, k) => ({
        elem: TableElements.TR, 
        content: [
            {
                attributes: [{name: "head-connect", value: "column-two" }],
                elem: TableElements.TD ,
                content: Object.values(amountOfInjures)[k]
            }, 
            {
                attributes: [{name: "head-connect", value: "column-two" }],
                elem: TableElements.TD , 
                content: String(countElements("amountOfInjures", Object.keys(amountOfInjures)[k], true))
            }
        ]
    }));

    const severenessImpact: TableElementProps[] = Array(3).fill(0)
    .map((i, k) => ({
        elem: TableElements.TR, 
        content: [
            {
                attributes: [{name: "head-connect", value: "column-three" }],
                elem: TableElements.TD ,
                content: Object.values(amountOfInjures)[k]
            }, 
            {
                attributes: [{name: "head-connect", value: "column-three" }],
                elem: TableElements.TD , 
                content: impactPercentCount(countElements("amountOfInjures", Object.keys(amountOfInjures)[k]), countElements("amountOfInjures", Object.keys(amountOfInjures)[k], true))
            }
        ]
    }));

    const guestSeverenessTable = new AppTable({
        parentId: "table-severeness",
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
                                content: "Severeness",
                                attributes: [{name: "head-connect", value: "column-zero" }]
                            },
                            {
                                elem: TableElements.TH,
                                content: "Request sent",
                                attributes: [{name: "head-connect", value: "column-one" }],
                            },
                            {
                                elem: TableElements.TH,
                                content: "Request responses",
                                attributes: [{name: "head-connect", value: "column-two" }],
                            },
                            {
                                elem: TableElements.TH,
                                content: "Impact",
                                attributes: [{name: "head-connect", value: "column-three" }],
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
                                content: "Severeness",
                                attributes: [{name: "head-connect", value: "column-zero" }],
                            },
                            {
                                elem: TableElements.TD,
                                content: severenessElements
                            },
                            {
                                elem: TableElements.TD,
                                content: severenessResponses
                            },
                            {
                                elem: TableElements.TD,
                                content: severenessImpact
                            }
                        ]
                    }
                ]
            }
        ]
    });

    const downloadPdfWithBrowserPrint = () => { 
        downloadPdf([ { table: guestReportTable, offset: 1 }, { table: guestAttacksTable, offset: 9 }, { table: guestTypeTable, offset: 4 }, { table: guestSeverenessTable, offset: 3 }]);
    };

    document.querySelector("#browser-print").addEventListener("click", downloadPdfWithBrowserPrint);

    
    console.log(guestReportTable, guestAttacksTable, guestSeverenessTable, guestTypeTable);
});