"use client"
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
import { useContext } from 'react';
import { StateContext } from '@/context/Context';

const columns = [
  { id: 'orgmb_name', label: 'Name of User', minWidth: 190 },
  { id: 'orgmb_email', label: 'Email', minWidth: 150 },
  { id: 'orgdp_name_en', label: 'Department', minWidth: 170 },
  { id: 'orgrl_name_en', label: 'Job Title', minWidth: 200 },
  { id: 'orgmbat_feature', label: 'Allowed Features', minWidth: 170 },
  { id: 'Edit', label: 'Edit', minWidth: 0, align: 'right' },
];

const createData = (orgmb_name, orgmb_email, orgdp_name_en, orgrl_name_en, orgmbat_feature, Edit) => {
  return { orgmb_name, orgmb_email, orgdp_name_en, orgrl_name_en, orgmbat_feature, Edit };
};

const StickyHeadTable = ({ userdata }) => {
  const { state, setState } = useContext(StateContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Map 'userdata' to create rows dynamically
  const rows = state.userdata.map((user) =>
    createData(
      `${user.orgmb_name} ${user.orgmb_surname}`,
      user.orgmb_email,
      user.orgdp_name_en,
      user.orgrl_name_en,
      user.orgmbat_feature.map((feature) => feature.feature).join(', '),
      'Edit'
    )
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof row[column.id] === 'number'
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
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
};

export default StickyHeadTable;
