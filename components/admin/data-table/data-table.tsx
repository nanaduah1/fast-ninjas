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
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
};

export type DataTableProps = {
  data: any[];
  columns: Column[];
  onRowClicked: (row:any, index?:number)=>void
};

export function DataTable({ data, columns, onRowClicked }: DataTableProps) {
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
      <>
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
                          onClick={()=>onRowClicked(row, index)}
                        >
                          {columns.map((column) => {
                            const value = row[column.field];
                            return (
                              <TableCell
                                key={column.title}
                                align={column.align}
                              >
                                {column.format && typeof value === "number"
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
                No available data
              </Box>
            )}
          </Table>
        </TableContainer>
        {data.length && (
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
      </>
    </Paper>
  );
}
