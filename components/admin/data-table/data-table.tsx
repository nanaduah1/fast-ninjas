import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";

export type Column = {
  field: string;
  title: string;
  minWidth?: number;
  align?: "right" | "left" | "center" | undefined;
  format?: (value: any) => string | JSX.Element;
};

export type DataTableProps = {
  data: any[];
  columns: Column[];
  onRowClicked?: (row: any, index?: number) => void;
  emptyDisplay?: string | JSX.Element;
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

export function DataTable({
  data,
  columns,
  onRowClicked,
  emptyDisplay,
}: DataTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                        {columns.map((column) => {
                          const value = get(column.field, row);
                          return (
                            <TableCell
                              key={column.title}
                              align={column.align}
                              sx={tableRowStyle}
                            >
                              {typeof column.format === "function"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {emptyDisplay ?? "No available data"}
            </Box>
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
