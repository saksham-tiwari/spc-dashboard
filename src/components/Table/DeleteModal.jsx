import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal(props) {
//   const [show, setShow] = useState(false);

  const handleClose = (cond) => {
    if(cond) props.setDel(props.prodId)
    props.setShow(false);
}
//   const handleShow = () => props.setShow(true);

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product? This change is irreversible.</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={()=>handleClose(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>handleClose(true)}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal