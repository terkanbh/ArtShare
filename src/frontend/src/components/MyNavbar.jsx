import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';

export default function MyNavbar() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Link to={'/'} className='navbar-brand'> ArtShare </Link>
        <Navbar.Toggle />
        <Nav className="justify-content-end">
          <Link to={'/login'} className='nav-link'> Login </Link>
          <Link to={'/register'} className='nav-link'> Register </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
