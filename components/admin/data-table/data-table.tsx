import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export type Column = {
  field: string;
  title: string;
  minWidth?: number;
  align?: "right" | "left" | "center" | undefined;
  render?: (value: any) => string | JSX.Element;
};

export type DataTableProps = {
  data: any[];
  columns: Column[];
  onRowClicked?: (row: any, index?: number) => void;
  emptyDisplay?: string | JSX.Element;
  showNumbering?: boolean;
};

const tableRowStyle = { cursor: "pointer" };

function get(attr: string, obj: any) {
  if (!obj) return null;
  if (!attr) return obj;
  if (!attr.includes(".")) return obj[attr];

  const keyParts = attr.split(".");

  let value = obj;
  for (let idx = 0; idx < keyParts.length; idx++) {
    if (value) {
      value = value[keyParts[idx]];
    } else break;
  }

  return value;
}

export function DataTable(props: DataTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, columns, onRowClicked, emptyDisplay, showNumbering } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {showNumbering === false ? null : (
                <TableCell key="num#">#</TableCell>
              )}
              {columns &&
                columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.title}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          {data.length ? (
            <TableBody>
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        onClick={() => onRowClicked && onRowClicked(row, index)}
                        sx={tableRowStyle}
                      >
                        {showNumbering === false ? null : (
                          <TableCell key="num-cell">{index + 1}</TableCell>
                        )}
                        {columns.map((column) => {
                          const value = get(column.field, row);
                          return (
                            <TableCell
                              key={column.title}
                              align={column.align}
                              sx={tableRowStyle}
                            >
                              {typeof column.render === "function"
                                ? column.render(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                {emptyDisplay ?? "No available data"}
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
      {data.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
