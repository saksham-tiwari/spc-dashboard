import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserModal(props) {
  const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
  const handleClose = () => props.setOpen({});

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={!_.isEmpty(props.open)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Items : {props.prod.Item.length} <br/>
            Amount : Rs. {props.prod.amount/100} <br/>
            Paid : {props.prod.paid?"True":"Not paid"} <br/>
            All Items : <br/>
            {props.prod.Item.map((item)=><>{item.product.name}  ({item.quantity})</>)}
          </Typography>
          <hr/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Name : {props.user.Name} <br/>
            Email : {props.user.email} <br/>
            Phone : {props.user.phoneNumber}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}