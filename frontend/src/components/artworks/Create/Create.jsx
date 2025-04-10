import { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import Container from '../../shared/Container.jsx';
import ImageViewer from '../../shared/ImageViewer/ImageViewer.jsx';
import { createArtwork } from '../../../services/artworksService.js';
import { uploadImage } from '../../../services/imagesService.js';
import { validateImage, validateDescription } from '../../../validation/artworkValidator.js';

export default function Create() {
  const [errorResponse, setErrorResponse] = useState(false);
  const navigate = useNavigate();
  const imageUrl = 'http://localhost:5000/images/artworks/default.webp';

  const [formData, setFormData] = useState({
    image: null,
    description: '',
  });

  const [formValidity, setFormValidity] = useState({
    image: true,
    description: true,
  });

  const handleChange = (field) => (e) => {
    if (field === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }

    if (!formValidity[field]) setFormValidity({ ...formValidity, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidity = {
      description: validateDescription(formData.description),
      image: validateImage(formData.image)
    };

    setFormValidity(newValidity);

    const isFormValid = Object.values(newValidity).every(Boolean);

    if (!isFormValid) return;

    createArtwork({ description: formData.description })
      .then(res => {
        if (formData.image) {
          uploadImage(res.artwork.id, formData.image)
            .finally(() => navigate(`/artworks/${res.artwork.id}`));
        } else {
          navigate(`/artworks/${res.artwork.id}`);
        }
      })
      .catch(() => setErrorResponse(true));
  };

  return (
    <Container md={8} lg={6}>
      <h1>Upload Artwork</h1>
      <ImageViewer imageUrl={imageUrl} showFile={true} file={formData.image}/>
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

        {/* Upload Failure Message */}
        {errorResponse && (
          <span className="invalid-feedback mb-3" style={{ display: 'block' }}>
            Upload failed. Please try again later.
          </span>
        )}

        {/* Submit Button */}
        <Button variant="primary" type="submit"> Upload </Button>

      </Form>
    </Container>
  );
}
