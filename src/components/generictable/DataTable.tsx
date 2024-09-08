import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Store } from "../../redux/reducers";
import { useSelector } from "react-redux";

type Column<T> = {
  label: string | React.ReactNode;
  renderContent: (item: T) => React.ReactNode;
};
type DataTableProps<T> = {
  items: T[];
  columns: Column<T>[];
};

function DataTable<T>({ items, columns }: DataTableProps<T>) {
  const color = useSelector((state: Store) => {
    return state.themeReducer.themeColor.color;
  });

  return (
    <TableContainer className="mobile">
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {columns.map((c) => {
              return (
                <TableCell align="center" sx={{ color: { color } }}>
                  {c.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => {
            return (
              <TableRow>
                {columns.map((c) => {
                  return (
                    <TableCell align="center" sx={{ color: { color } }}>
                      {c.renderContent(item)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
