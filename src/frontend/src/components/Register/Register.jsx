import { useState } from 'react';
import { validateName, validateEmail, validatePassword } from '../../validation/userValidator.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [lastNameIsValid, setLastNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [rePasswordIsValid, setRePasswordIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validFirstName = validateName(firstName);
    const validLastName = validateName(lastName);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const validRePassword = password === rePassword && validPassword;

    setFirstNameIsValid(validFirstName);
    setLastNameIsValid(validLastName);
    setEmailIsValid(validEmail);
    setPasswordIsValid(validPassword);
    setRePasswordIsValid(validRePassword)

    if (validFirstName && validLastName && validEmail && validPassword && validRePassword) {
      console.log("Form submitted!");
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit}>

            {/* FIRST NAME */}
            <Form.Group className="mb-3" controlId="formGroupFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pesho"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value)
                  setFirstNameIsValid(true);
                }}
                isInvalid={!firstNameIsValid}
              />
              <Form.Control.Feedback type="invalid">
                First name must be less than 50 characters and contain only letters.
              </Form.Control.Feedback>
            </Form.Group>

            {/* LAST NAME */}
            <Form.Group className="mb-3" controlId="formGroupLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Peshev"
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value)
                  setLastNameIsValid(true);
                }}
                isInvalid={!lastNameIsValid}
              />
              <Form.Control.Feedback type="invalid">
                Last name must be less than 50 characters and contain only letters.
              </Form.Control.Feedback>
            </Form.Group>

            {/* EMAIL */}
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="pesho@abv.bg"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setEmailIsValid(true);
                }}
                isInvalid={!emailIsValid}
              />
              <Form.Control.Feedback type="invalid">
                Invalid email
              </Form.Control.Feedback>
            </Form.Group>

            {/* PASSWORD */}
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  setPasswordIsValid(true);
                }}
                isInvalid={!passwordIsValid}
              />
              <Form.Control.Feedback type="invalid">
                Password must be 6+ characters with at least 1 uppercase, 1 lowercase, and 1 digit
              </Form.Control.Feedback>
            </Form.Group>

            {/* RE-PASSWORD */}
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label> Repeat Password </Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={rePassword}
                onChange={e => {
                  setRePassword(e.target.value)
                  setRePasswordIsValid(true);
                }}
                isInvalid={!rePasswordIsValid}
              />
              <Form.Control.Feedback type="invalid">
                Passwords doesn't match
              </Form.Control.Feedback>
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
