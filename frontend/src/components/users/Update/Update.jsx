import { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../../hooks/useAuth.jsx';
import { updateUser } from '../../../services/usersService.js';
import { uploadImage } from '../../../services/imagesService.js';
import { validateName, validateEmail } from '../../../validation/userValidator.js';
import { validateImage } from '../../../validation/imageValidator.js';
import Delete from '../Delete/Delete.jsx';
import Container from '../../shared/Container.jsx';
import ImageViewer from '../../shared/ImageViewer/ImageViewer.jsx';

export default function Update() {
  const [auth, setAuth] = useAuth();
  const [errorResponse, setErrorResponse] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
    image: null
  });

  const [formValidity, setFormValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    image: true
  });

  const handleChange = (field) => (e) => {
    let newValue = null;
    switch (field) {
      case 'image': newValue = e.target.files[0]; break;
      default: newValue = e.target.value;
    }

    setFormData({ ...formData, [field]: newValue });

    if (!formValidity[field]) setFormValidity({ ...formValidity, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidity = {
      firstName: validateName(formData.firstName),
      lastName: validateName(formData.lastName),
      email: validateEmail(formData.email),
      image: validateImage(formData.image)
    };

    setFormValidity(newValidity);

    const isFormValid = Object.values(newValidity).every(Boolean);

    if (!isFormValid) return;

    try {
      const { image, ...updateUserForm } = { ...formData };
      const userRes = await updateUser(auth.id, updateUserForm);

      try {
        if(image) {
          await uploadImage('users', auth.id, image);
        }
      } catch { console.error('Update user image failed.'); }

      setAuth(userRes);
      navigate(`/users/${auth.id}`);
    } catch (e) { setErrorResponse(true); }
  };

  return (
    <Container md={8} lg={6}>
      <h1>Update Profile</h1>
      <ImageViewer imageUrl={auth.imageUrl} />
      <Form onSubmit={handleSubmit}>

        {/* Image Upload */}
        <Form.Group className="mb-3">
          <Form.Control type="file" size="lg" accept=".webp" onChange={handleChange('image')} isInvalid={!formValidity.image} />
          <Form.Control.Feedback type="invalid"> Image must be `.webp` and under 40KB. </Form.Control.Feedback>
        </Form.Group>

        {/* First Name */}
        <FloatingLabel label="First Name" className="mb-3">
          <Form.Control type="text" value={formData.firstName} onChange={handleChange('firstName')} isInvalid={!formValidity.firstName} />
          <Form.Control.Feedback type="invalid"> First name must be less than 50 characters and contain only letters. </Form.Control.Feedback>
        </FloatingLabel>

        {/* Last Name */}
        <FloatingLabel label="Last Name" className="mb-3">
          <Form.Control type="text" value={formData.lastName} onChange={handleChange('lastName')} isInvalid={!formValidity.lastName} />
          <Form.Control.Feedback type="invalid"> Last name must be less than 50 characters and contain only letters. </Form.Control.Feedback>
        </FloatingLabel>

        {/* Email */}
        <FloatingLabel label="Email Address" className="mb-3">
          <Form.Control type="email" value={formData.email} onChange={handleChange('email')} isInvalid={!formValidity.email} />
          <Form.Control.Feedback type="invalid"> Invalid email </Form.Control.Feedback>
        </FloatingLabel>

        {/* Update Fail */}
        {
          errorResponse &&
          <span className="invalid-feedback mb-3" style={{ display: 'block' }}>
            Update failed. Please try again later.
          </span>
        }

        {/* Submit */}
        <Button variant="primary" type="submit" className="me-3"> Update </Button>

        {/* Delete */}
        <Delete setErrorResponse={setErrorResponse} />

      </Form>
    </Container>
  );
}
