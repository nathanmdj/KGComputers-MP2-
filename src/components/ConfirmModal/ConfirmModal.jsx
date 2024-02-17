import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { deleteRequest } from '../../utils/apiRequest'
const ConfirmModal = (props) => {
  
  const handleConfirm = () => {
    if(props.mode === 'itemDelete') {
      deleteRequest(`delete-product/${props.id}`)
      .then((data)=>{
        props.setUpdate(!props.update)
        props.setShow(false)
      })
    }
  }

  return (
    <div>
      <Modal
        show={props.show}
        onHide={()=>props.setShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.setShow(false)}>
            {props.buttonClose}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>{props.buttonOk}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ConfirmModal