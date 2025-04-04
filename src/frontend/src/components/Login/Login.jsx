import { useState } from 'react';
import { useNavigate } from 'react-router';
import { validateEmail, validatePassword } from '../../validation/userValidator.js'
import { login } from '../../services/authService.js';
import { useUser } from '../../context/UserProvider.jsx';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Login() {
  const [_, setUser] = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [loginFail, setLoginFail] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    setEmailIsValid(validEmail);
    setPasswordIsValid(validPassword);

    if (validEmail && validPassword) {
      login({email, password, rememberMe})
        .then(res => {
          setUser(res);
          navigate('/');
      })
        .catch(_ => setLoginFail(true));
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
              <FloatingLabel label="Email">
                <Form.Control type="email" value={email} isInvalid={!emailIsValid}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!emailIsValid) setEmailIsValid(true);
                  }}
                />
                <Form.Control.Feedback type="invalid"> Invalid email </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            {/* PASSWORD */}
            <Form.Group className="mb-3">
              <FloatingLabel label="Password">
                <Form.Control type="password" value={password} isInvalid={!passwordIsValid}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!passwordIsValid) setPasswordIsValid(true);
                  }}
                />
                <Form.Control.Feedback type="invalid"> Invalid password </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            {/* REMEMBER ME? */}
            <Form.Group className="mb-3" style={{ paddingLeft: '5px' }}>
              <Form.Check type="checkbox" label="Remember me?" checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.value)}
              />
            </Form.Group>

            {/* SUBMIT */}
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>

              {
                loginFail &&
                <span className="invalid-feedback" style={{display: 'block'}}>
                  Invalid login
                </span>
              }
            </div>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}
