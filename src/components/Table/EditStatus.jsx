import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateStatus } from 'server/services/admin/admin.service';
import { message } from 'antd';

export default function EditStatus(props) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

  React.useEffect(()=>{
    setStatus(props.curr)
  },[props])

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (cond) => {
    if (cond) {
      console.log("Update");
      updateStatus(props.openEdit,status)
      .then((res)=>{
        message.success("Status Updated!")
        props.setUpdate(prev=>!prev)
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    props.setOpenEdit("")
  };

  return (
    <div>
      {/* <Button onClick={handleClickOpen}>Open select dialog</Button> */}
      <Dialog disableEscapeKeyDown open={props.openEdit} onClose={()=>{props.setOpenEdit("")}}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                native
                value={status}
                onChange={handleChange}
                input={<OutlinedInput label="Status" id="demo-dialog-native" />}
              >
                {/* <option aria-label="None" value="" /> */}
                <option value={"pending"}>pending</option>
                <option value={"onHold"}>OnHold</option>
                <option value={"Completed"}>Completed</option>
                <option value={"cancelled"}>cancelled</option>
                <option value={"delivered"}>delivered</option>
              </Select>
            </FormControl>
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Age</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={age}
                onChange={handleChange}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>Cancel</Button>
          <Button onClick={()=>handleClose(true)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}