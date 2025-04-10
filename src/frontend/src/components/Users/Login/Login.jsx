import { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAuth } from '../../../hooks/useAuth.jsx';
import { login } from '../../../services/authService.js';
import { validateEmail, validatePassword } from '../../../validation/userValidator.js'

export default function Login() {
  const [errorResponse, setErrorResponse] = useState(false);
  const [, setAuth] = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [formValidity, setFormValidity] = useState({
    email: true,
    password: true,
  });

  const handleChange = (field) => (e) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });

    if (field in formValidity && !formValidity[field]) {
      setFormValidity({ ...formValidity, [field]: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newValidity = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setFormValidity(newValidity);

    const isFormValid = Object.values(newValidity).every(Boolean);

    if (!isFormValid) return;

    login(formData)
      .then((res) => {
        setAuth(res);
        navigate('/');
      })
      .catch(() => setErrorResponse(true));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>

            {/* Email */}
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control type="email" value={formData.email} onChange={handleChange('email')} isInvalid={!formValidity.email} />
              <Form.Control.Feedback type="invalid"> Invalid email </Form.Control.Feedback>
            </FloatingLabel>

            {/* Password */}
            <FloatingLabel label="Password" className="mb-3">
              <Form.Control type="password" value={formData.password} onChange={handleChange('password')} isInvalid={!formValidity.password} />
              <Form.Control.Feedback type="invalid"> Invalid password </Form.Control.Feedback>
            </FloatingLabel>

            {/* Remember Me */}
            <Form.Group className="mb-3" style={{ paddingLeft: '5px' }}>
              <Form.Check type="checkbox" label="Remember me?" checked={formData.rememberMe} onChange={handleChange('rememberMe')} />
            </Form.Group>

            {/* Login fail */}
            {
              errorResponse &&
              <span className="invalid-feedback mb-3" style={{ display: 'block' }}>
                Invalid login
              </span>
            }

            {/* Submit */}
            <Button variant="primary" type="submit"> Submit </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}
