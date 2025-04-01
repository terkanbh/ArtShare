import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MyNavbar() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">ArtShare</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="justify-content-end">
          <Nav.Link href="#">Login</Nav.Link>
          <Nav.Link href="#">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
