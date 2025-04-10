import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useAuth } from '../../../hooks/useAuth.jsx';
import { deleteUser } from '../../../services/usersService.js';

export default function Delete({setErrorResponse}) {
  const [auth, setAuth] = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    deleteUser(auth.id)
      .then(() => {
        setAuth(null);
        navigate('/');
      })
      .catch(() => {
        setErrorResponse(true);
        setShow(false);
      });
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>Delete</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Confirm Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
