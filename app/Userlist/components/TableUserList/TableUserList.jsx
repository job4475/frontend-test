import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import { StateContext } from '@/context/Context';
import { Box, Chip,IconButton  } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HandleManagerList from '@/handle/managerlist'
const columns = [
  { id: 'NameOFUser', label: 'NAME OF USER', minWidth: 190 },
  { id: 'Email', label: 'EMAIL', minWidth: 150 },
  { id: 'Department', label: 'DEPARTMENT', minWidth: 170,align:"center" },
  { id: 'Jobtitle', label: 'JOB TITLE', minWidth: 200,align:"center" },
  { id: 'AllowedFeatures', label: 'ALLOWED FEATURES', minWidth: 170,align:"center" },
  { id: 'Edit', label: 'EDIT', minWidth: 0,  },

];

export default function StickyHeadTable() {
  const { state, setState } = useContext(StateContext);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleManagerList = HandleManagerList();

  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
    <Paper sx={{ width: '100%' }}>
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
         {state.alluser?.map((user) => (
           <TableRow key={user.orgmb_id} hover role="checkbox" tabIndex={-1}>
             <TableCell style={{textTransform:"capitalize",fontWeight:500}}>{user.orgmb_name} {user.orgmb_surname}</TableCell>
             <TableCell style={{fontWeight:500}}>{user.orgmb_email}</TableCell>
             <TableCell align='center' style={{fontWeight:500}}>{user.orgdp_name_en}</TableCell>
             <TableCell align='center' style={{fontWeight:500}}>{user.orgrl_name_en}</TableCell>
             <TableCell align='center'>
               {user.orgmbat_feature.map((feature, index) => (
                 <Chip
                 key={index}
                 label={feature.feature}
                 sx={{cursor:"pointer",fontSize:"10px",fontWeight:600,color:"#285449",bgcolor:"featurebt.main",border:"1px solid #285449"}}
                 disabled={false}
                 variant="filled"
                 size="small"
                 style={{ marginRight: '5px' }}
                 />
                 ))}
             </TableCell>
             <TableCell style={{fontWeight:500}}><IconButton onClick={()=>{
              handleManagerList.handleClicktoEdit(user,"Edit");
              handleOpen();
              }}><MoreVertIcon sx={{cursor:"pointer"}}/></IconButton></TableCell>

            
           </TableRow>
         ))}
       </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={state.alluser?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


    </Paper>
    </>
  );
}