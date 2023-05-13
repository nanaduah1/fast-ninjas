export interface Column {
  field: string;
  title: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

export const createCols = (cols: Array<Column>) => {
  const columns: Column[] = [];
  let index: number = 0;
  for (const col of cols) {
    columns.push({
      field: col.field,
      title: col.title,
      minWidth: 170,
      align: index === 0 ? "left" : "right",
      format: (value: number) => value.toLocaleString("en-US"),
    });
    index++;
  }
  return columns;
};

export function createRows(rows: Array<any>, cols: Array<Column>): any {
  const data: any = [];
  for (const row of rows) {
    let currentRow: any = {};
    for (let i = 0; i < cols.length; i++) {
      currentRow = { ...currentRow, [cols[i].field]: row[cols[i].field] };
    }
    data.push(currentRow);
  }
  return data;
}
