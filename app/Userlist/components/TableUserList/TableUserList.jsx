import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';


const columns = [
  { id: 'NameOFUser', label: 'NAME OF USER', minWidth: 190 },
  { id: 'Email', label: 'EMAIL', minWidth: 150 },
  { id: 'Department', label: 'DEPARTMENT', minWidth: 170, },
  { id: 'Jobtitle', label: 'JOB TITLE', minWidth: 200, },
  { id: 'AllowedFeatures', label: 'ALLOWED FEATURES', minWidth: 170, },
  { id: 'Edit', label: 'EDIT', minWidth: 0, align: 'right' },

];

function createData(NameOFUser, Email, Department, Jobtitle, AllowedFeatures, Edit) {
  return { NameOFUser, Email, Department, Jobtitle, AllowedFeatures, Edit };
}

const rows = [
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),
  createData('Kraiwit Bunchu', 'kraiwit1711@hotmail.com', 'Development & BI', 'UX/UI', 'Share Doucument'),

];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', oveoverflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" style={{ border: 'solid 1px #C2CCE1', borderTop: 'none' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, background: '#F7F8F9', fontWeight: '600', color: '#778296' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}