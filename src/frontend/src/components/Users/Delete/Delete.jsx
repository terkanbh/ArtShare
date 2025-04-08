import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../../../context/UserProvider.jsx';
import { deleteUser } from '../../../services/usersService.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Delete({setErrorResponse}) {
  const [user, setUser] = useUser();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    deleteUser(user.id)
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch(e => setErrorResponse(e));
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
