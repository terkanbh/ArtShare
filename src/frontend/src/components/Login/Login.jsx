import { useState } from 'react';
import { validateEmail, validatePassword } from '../../validation/userValidator.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    setEmailIsValid(validEmail);
    setPasswordIsValid(validPassword);

    if (validEmail && validPassword) {
      console.log("Form submitted!");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Login</h1>

          <Form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!emailIsValid) setEmailIsValid(true);
                }}
                isInvalid={!emailIsValid} />
              <Form.Control.Feedback type="invalid">
                Invalid email
              </Form.Control.Feedback>
            </Form.Group>

            {/* PASSWORD */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!passwordIsValid) setPasswordIsValid(true);
                }}
                isInvalid={!passwordIsValid} />
              <Form.Control.Feedback type="invalid">
                Invalid password
              </Form.Control.Feedback>
            </Form.Group>

            {/* REMEMBER ME? */}
            <Form.Group className="mb-3" style={{ paddingLeft: '5px' }}>
              <Form.Check
                type="checkbox"
                label="Remember me?"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}
