import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from '../../../hooks/useAuth.jsx';
import { deleteArtwork } from "../../../services/artworksService.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Delete({ artworkId, setErrorResponse }) {
  const [auth] = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    deleteArtwork(artworkId)
      .then(() => navigate(`/users/${auth.id}`))
      .catch(() => {
        setErrorResponse(true);
        setShow(false);
      });
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>Delete Artwork</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this artwork?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Confirm Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
