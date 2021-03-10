import AppTable from "../classes/AppTable";
import AppElementUI from "../classes/AppElement";
import _ from "lodash";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createTable = (items: string[] | string) => {
    return ({
        table: {
            widths: typeof items === "string" ? [115] : [70, 40],
            body: typeof items === "string" ? ([[{text: items, fontSize: 9, alignment: "left", lineHeight: 1.5}]]) : [items.map((i, k) => k === 1 ? ({text: i, alignment: "center", lineHeight: 1.5}) : ({text: i, alignment: "left", fontSize: 9, lineHeight: 1.5}))]
        },
        layout: "noBorders",
        paddingLeft: function() { return 1; },
        paddingRight: function() { return 1; },
        paddingTop: function() { return 1; },
        paddingBottom: function() { return 1; },
    });
};

const mapInnerHtml = (items: AppElementUI[]): string[] => {
    return items.map(i => i.innerHtml);
};

const createTableDataContent = (tableEntity: AppTable, offset: number) => {
    if (offset < 0) {
        throw new Error("Coudn't create an table. Offset should be natural number.");
    }
    const grouped: AppElementUI[][] = Object.values(_.mapValues(_.groupBy(tableEntity.getRows(), "parentElementId"),
    clist => clist.map(car => _.omit(car, "parentElementId"))));
    const tableHeaderText = tableEntity.getHeadText().map(i => ({text: i, style: "table__body-element" }));
    if (offset === 1) {
        const tableRowCellsInitial: string[] = [].concat.apply([], grouped.map(i => mapInnerHtml(i)));
        const tableRowCells = tableRowCellsInitial.map(i => createTable(i));
        return [tableHeaderText, tableRowCells];
    } 
    const tableRowCells = grouped.map(i => (createTable(mapInnerHtml(i))));
    const tableDataAsRows = tableRowCells.filter((i, j) => j !== 0).reduce((rows, cellData, index) => {
        if (index % offset === 0) {
          rows.push([]);
        }
        rows[rows.length - 1].push(cellData);
        return rows;
      }, []);
    tableDataAsRows.unshift(tableRowCells[0]);

    return [tableHeaderText, tableDataAsRows];
};


const createNewPdf = (name: string, tableEntity: prop[]) => {
    const contents = [];
    for (const table of tableEntity) {
        const t = createTableDataContent(table.table, table.offset);
        contents.push(t);
    }
    const tables = Array(contents.length).fill(0).map((i, k) => {
        return (
            {
                style: "table",
                table: {
                  headerRows: 1,
                  body: contents[k],
                },
                layout: "noBorders",
                paddingLeft: function() { return 2; },
				paddingRight: function() { return 2; },
                paddingTop: function() { return 2; },
				paddingBottom: function() { return 2; },
              }
        );
    });

    return ({
        pageMargins: [ 40, 60, 40, 60 ],
        header: { text: name, alignment: "center", fontSize: 20, margin: [0, 5, 0, 20] },
        footer: function(currentPage, pageCount) { return ({ text: `Page ${currentPage} of ${pageCount}`, alignment: "center" }); },
        content: tables,
        styles: {
          "table": {
            margin: [20, 0, 0, 80],
          },
          "table__head-element": {
            fontSize: 24,
          },
          "table__body-element": {
            fontSize: 14,
            bold: true,
            lineHeight: 1.5,
            background: "#ffffff",
            color: "#002629"
          },
        },
      });
};

type prop = {
    table: AppTable,
    offset: number 
}

const downloadPdf = (tables: prop[]) =>  {
    const docDefinition = createNewPdf("Statistics", tables);      

    pdfMake.createPdf(docDefinition).download("Statistics");
};

export default downloadPdf;