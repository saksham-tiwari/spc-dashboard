import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from "./DeleteModal"
import { deleteProduct } from 'server/services/admin/admin.service';
import { message } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditStatus from './EditStatus';
import { useHistory } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UserModal from './UserModal';
import { TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#247F70",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - page.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [show,setShow] = React.useState(false);
  const [del,setDel] = React.useState("");
  const [prodId,setProdId] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState("");
  const [viewUser,setViewUser] = React.useState({})
  React.useEffect(()=>{
    if(del.length){
      deleteProduct(del)
      .then((res)=>{
        console.log(res)
        setDel("")
        props.setUpdate(prev=>!prev)
        message.success("Deleted")
      })
      .catch((err)=>{
        console.log(err)
        setDel("")
        message.error("Delete failed")
      })
    }
  },[del])

  const getDate = (x)=>{
    var date = new Date(x)
    return (date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear())
  }
  const history = useHistory()

  return (
    <TableContainer component={Paper}>
    <DeleteModal show={show} setShow={setShow} prodId={prodId} setDel={setDel}/>

      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          {props.titles.length===6&&<TableRow>
            <StyledTableCell colSpan="3">
              <h3>Order History</h3>
            </StyledTableCell>
            <StyledTableCell colSpan="2">
              <TextField className='filter' id="outlined-basic" label="Search" variant="outlined" value={props.search} onChange={(e)=>props.setSearch(e.target.value)} />
            </StyledTableCell>
            <StyledTableCell colSpan={"1"}>
            <FormControl 
                fullWidth 
                className='filter'
            >
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.filter}
                label="filter"
                onChange={(e)=>props.setFilter(e.target.value)}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"pending"}>pending</MenuItem>
                <MenuItem value={"onHold"}>onHold</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"cancelled"}>cancelled</MenuItem>
                <MenuItem value={"delivered"}>delivered</MenuItem>
              </Select>
            </FormControl>
            </StyledTableCell>
          </TableRow>}
          <TableRow>
            {props.titles.map((title,i)=><StyledTableCell align={!i?"left":"center"}>{title}</StyledTableCell>)}
            {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? props.products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.products
          ).map((prod,i)=>{
            if(props.titles.length===5) {return <TableRow key={prod._id}>
              <TableCell style={{ width: 160 }} component="th" scope="row">
                {prod.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.category}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.quantity}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                <div className='d-flex align-items-center justify-content-center actions'>
                  <EditIcon onClick={()=>{
                    // history.push("/admin/add-product")
                    history.push({ 
                      pathname: '/admin/add-product',
                      state: {product:prod}
                      });
                    }} className='cursor-pointer edit'/>
                  <DeleteIcon onClick={()=>{
                    setProdId(prod._id)
                    setShow(true)
                    }} className='cursor-pointer delete'/>
                </div>
              </TableCell>
            </TableRow>}  
            else {return <TableRow key={prod._id}>
              <TableCell style={{ width: 160 }} component="th" scope="row">
                {prod._id}
              </TableCell>
              <TableCell style={{ width: 160, textTransform:"capitalize" }} align="center">
                {prod.status} <EditIcon fontSize='small' className='cursor-pointer edit' onClick={()=>{
                  console.log(prod._id)
                  setOpenEdit(prod._id)
                }} />
                <EditStatus openEdit={openEdit} setOpenEdit={setOpenEdit} curr={prod.status} setUpdate={props.setUpdate} />
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.amount/100}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.createdBy.Name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {getDate(prod.createdAt)}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                <div className='d-flex align-items-center justify-content-center actions'>
                  {/* <EditIcon className='cursor-pointer edit'/> */}
                  <span className='cursor-pointer' onClick={()=>{
                    console.log(prod)
                    setViewUser(prod.createdBy)}} > <VisibilityIcon className='edit'/> View Details </span>
                  <UserModal open={viewUser} setOpen={setViewUser} prod={prod}/>
                  {/* <DeleteIcon onClick={()=>{
                    setProdId(prod._id)
                    setShow(true)
                    }} className='cursor-pointer delete'/> */}
                </div>
              </TableCell>
            </TableRow>}
          })}
          {/* .map((prod,i) => (
            <TableRow key={prod._id}>
              <TableCell style={{ width: 160 }} component="th" scope="row">
                {prod.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.category}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.quantity}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {prod.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                <div className='d-flex align-items-center justify-content-center actions'>
                  <EditIcon className='cursor-pointer edit'/>
                  <DeleteIcon onClick={()=>{
                    setProdId(prod._id)
                    setShow(true)
                    }} className='cursor-pointer delete'/>
                </div>
              </TableCell>
            </TableRow>
          ))} */}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={props.products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}