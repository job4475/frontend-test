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
import { Badge, Box, Button, Chip,IconButton  } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import HandleManagerList from '@/handle/managerlist'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
const columns = [
  { id: 'NameOFUser', label: 'NAME OF USER', minWidth: 190 },
  { id: 'Email', label: 'EMAIL', minWidth: 150 },
  { id: 'Department', label: 'DEPARTMENT', minWidth: 170,align:"center" },
  { id: 'Jobtitle', label: 'JOB TITLE', minWidth: 200,align:"center" },
  { id: 'Status', label: 'STATUS', minWidth: 170,align:"center" },
  { id: 'Approve', label: 'APPROVE', align:"center" },
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

  return (
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
         {state.allmanageradmin?.map((user,index) => (
           user.status === "Pending" ? (
            <TableRow key={`${index}`} hover role="checkbox" tabIndex={-1}>
              <TableCell style={{textTransform:"capitalize",fontWeight:500}}>{user.firstname} {user.surname}</TableCell>
              <TableCell style={{fontWeight:500}}>{user.username}</TableCell>
              <TableCell align='center' style={{fontWeight:500}}>{user.department}</TableCell>
              <TableCell align='center' style={{fontWeight:500}}>{user.jobtitle}</TableCell>
              <TableCell align='center' style={{fontWeight:500,color:user.status==="Active"?"green":user.status==="Pending"?"orange":user.status==="Inactive"?"red":""}}>
               {user.status} 
               {user.status==="Active"?(
                 <StyledBadge sx={{ml:1}} overlap="circular"  variant="dot"></StyledBadge>
               ):null}
               </TableCell>
              <TableCell align='center' style={{fontWeight:500}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',visibility:user.status==="Active"||user.status==="Inactive"? "hidden":"visible" }}>
               <Button id="Approve" onClick={()=>{handleManagerList.handleClicktoApprove(user,"Active")}} sx={{ flexGrow: 1, marginRight: '8px' }} variant="contained" color="adminapprove" style={{ borderRadius: "7px", minWidth: "50%", textTransform: "capitalize", color: "white", fontWeight: 600 }}>Approve</Button>
               <Button id="Reject" onClick={()=>{handleManagerList.handleReject(user,"Inactive")}} variant="contained" color="adminreject" style={{ borderRadius: "7px", minWidth: "50%", textTransform: "capitalize", color: "white", fontWeight: 600 }}>Reject</Button>
              </Box>
              </TableCell>
            </TableRow>
           ):(null)
         ))}
       </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={state.allmanageradmin?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

    </Paper>
  );
}