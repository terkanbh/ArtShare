import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { getArtwork, updateArtwork } from '../../../services/artworksService.js';
import { validateDescription } from '../../../validation/artworkValidator.js';
import { validateImage } from '../../../validation/imageValidator.js';
import { uploadImage } from '../../../services/imagesService.js';
import Delete from '../Delete/Delete.jsx';
import Container from '../../shared/Container.jsx';
import ImageViewer from '../../shared/ImageViewer/ImageViewer.jsx';

export default function EditArtwork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(false);
  const [imageUrl, setImageUrl] = useState('http://localhost:5000/images/artworks/default.webp');

  const [formData, setFormData] = useState({
    image: null,
    description: '',
  });

  const [formValidity, setFormValidity] = useState({
    image: true,
    description: true,
  });

  useEffect(() => {
    getArtwork(id)
      .then(artworkDetails => {
        setFormData({
          ...formData,
          description: artworkDetails.artwork.description
        });
        setImageUrl(artworkDetails.artwork.imageUrl);
      })
      .catch(() => setErrorResponse('Failed to load artwork'));
  }, [id]);

  const handleChange = (field) => (e) => {
    if (field === 'image') {
      setFormData({ ...formData, image: e.target.files[0] || null });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }

    if (!formValidity[field]) setFormValidity({ ...formValidity, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidity = {
      description: validateDescription(formData.description),
      image: !formData.image || validateImage(formData.image)
    };

    setFormValidity(newValidity);

    const isFormValid = Object.values(newValidity).every(Boolean);

    if (!isFormValid) return;

    updateArtwork(id, { description: formData.description })
      .then((res) => {
        if (formData.image) {
          uploadImage('artworks', res.artwork.id, formData.image)
            .then(imageRes => console.log(imageRes))
            .catch(e => console.error(e))
            .finally(_ => navigate(`/artworks/${res.artwork.id}`));
        } else {
          navigate(`/artworks/${res.artwork.id}`);
        }
      })
      .catch(() => setErrorResponse('Update artwork failed'));
  };

  return (
    <Container md={8} lg={6}>
      <h1>Edit Artwork</h1>
      <ImageViewer imageUrl={imageUrl} />
      <Form onSubmit={handleSubmit}>

        {/* Image Upload */}
        <Form.Group className="mb-3">
          <Form.Control type="file" size="lg" accept=".webp" onChange={handleChange('image')} isInvalid={!formValidity.image} />
          <Form.Control.Feedback type="invalid"> Image must be `.webp` and under 40KB. </Form.Control.Feedback>
        </Form.Group>

        {/* Description */}
        <FloatingLabel label="Description" className="mb-3">
          <Form.Control as="textarea" value={formData.description} onChange={handleChange('description')} isInvalid={!formValidity.description} style={{ height: '100px' }} />
          <Form.Control.Feedback type="invalid"> Description must be 1-500 characters. </Form.Control.Feedback>
        </FloatingLabel>

        {/* Update Failure Message */}
        {errorResponse && (
          <span className="invalid-feedback mb-3" style={{ display: 'block' }}>
            Update failed. Please try again later.
          </span>
        )}

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="me-3"> Save Changes </Button>

        {/* Delete */}
        <Delete artworkId={id} setErrorResponse={setErrorResponse} />

      </Form>
    </Container>
  );
}
