import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableContainerDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  min-height: 400px;
`;

export default function TableBox({ building }) {
  let rows;
  if (building !== null) {
    const { properties } = building;
    rows = Object.entries(properties).map(([k, v]) => {
      return {
        key: k,
        value: parseInt(v),
      };
    });
  }

  return (
    <TableContainerDiv>
      {!building && "Please select any building"}
      {building && (
        <TableContainer component={Paper} style={{ maxHeight: 500 }}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: "#808080", color: "#ffffff" }}
                >
                  Attributes
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#808080", color: "#ffffff" }}
                  align="right"
                >
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {row.key}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </TableContainerDiv>
  );
}
