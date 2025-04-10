import { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { register } from '../../../services/authService.js';
import { validateName, validateEmail, validatePassword } from '../../../validation/userValidator.js'
import Container from '../../shared/Container.jsx';

export default function Register() {
  const navigate = useNavigate();
  const [internalServerError, setInternalServerError] = useState(false);
  const [badRequest, setBadRequest] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const [formValidity, setFormValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    rePassword: true,
  });

  const handleChange = field => e => {
    setFormData({ ...formData, [field]: e.target.value });

    if (!formValidity[field])
      setFormValidity({ ...formValidity, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidity = {
      firstName: validateName(formData.firstName),
      lastName: validateName(formData.lastName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      rePassword: formData.password === formData.rePassword
    };

    setFormValidity(newValidity);

    const isFormValid = Object.values(newValidity).every(Boolean);

    if (!isFormValid) return;

    try {
      const { image, ...registerForm } = formData;
      await register(registerForm);
      navigate('/login');
    } catch (res) {
      if (res.status === 400) setBadRequest(res.errors.join('\n', res.errors));
      else setInternalServerError(true);
    }
  };

  return (
    <Container md={8} lg={6}>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>

        {/* First Name */}
        <FloatingLabel label="First Name" className="mb-3">
          <Form.Control type="text" value={formData.firstName} onChange={handleChange('firstName')} isInvalid={!formValidity.firstName} />
          <Form.Control.Feedback type="invalid"> First name must be less than 50 characters and contain only letters.  </Form.Control.Feedback>
        </FloatingLabel>

        {/* Last name */}
        <FloatingLabel label="Last Name" className="mb-3">
          <Form.Control type="text" value={formData.lastName} onChange={handleChange('lastName')} isInvalid={!formValidity.lastName} />
          <Form.Control.Feedback type="invalid"> Last name must be less than 50 characters and contain only letters.  </Form.Control.Feedback>
        </FloatingLabel>

        {/* Email */}
        <FloatingLabel label="Email Address" className="mb-3">
          <Form.Control type="email" value={formData.email} onChange={handleChange('email')} isInvalid={!formValidity.email} />
          <Form.Control.Feedback type="invalid"> Invalid email </Form.Control.Feedback>
        </FloatingLabel>

        {/* Password */}
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control type="password" value={formData.password} onChange={handleChange('password')} isInvalid={!formValidity.password} />
          <Form.Control.Feedback type="invalid"> Password must be 6+ characters with at least 1 uppercase, 1 lowercase, and 1 digit </Form.Control.Feedback>
        </FloatingLabel>

        {/* Repeat password */}
        <FloatingLabel label="Repeat Password" className="mb-3">
          <Form.Control type="password" value={formData.rePassword} onChange={handleChange('rePassword')} isInvalid={!formValidity.rePassword} />
          <Form.Control.Feedback type="invalid"> Passwords don't match </Form.Control.Feedback>
        </FloatingLabel>

        {/* Internal server error */}
        {internalServerError &&
        <span className="invalid-feedback mb-3" style={{ display: 'block' }}>
          Register failed. Please try again later.
        </span>}

        {/* Validation error */}
        {badRequest &&
        <span className="invalid-feedback mb-3" style={{ display: 'block' }}>
          {badRequest}
        </span>}

        {/* Submit */}
        <Button variant="primary" type="submit"> Submit </Button>

      </Form>
    </Container>
  );
}
