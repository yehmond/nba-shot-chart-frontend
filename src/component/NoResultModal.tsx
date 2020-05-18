import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  title: string;
  message: string;
}

export default function NoResultModal({ title, message }: Props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span role="img" aria-label="Caution">
            ⚠️
          </span>
          &nbsp; {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
