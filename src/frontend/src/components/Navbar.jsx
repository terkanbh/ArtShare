import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
import { useUser } from '../context/UserProvider.jsx';
import { logout } from '../services/authService.js';

export default function Navbar() {
  const [user, setUser] = useUser();

  return (
    <NavbarBS className="bg-body-tertiary">
      <Container>
        <Link to={'/'} className='navbar-brand'> ArtShare </Link>
        <NavbarBS.Toggle />
        <Nav className="justify-content-end">
          {
            !user
            ? <>
              <Link to={'/login'} className='nav-link'> Login </Link>
              <Link to={'/register'} className='nav-link'> Register </Link>
            </>
            : <>
              <Link to={`/users/${user.id}`} className='nav-link'> {user.email} </Link>
              <Link className='nav-link' onClick={() => {
                logout();
                setUser(null);
              }}> Logout </Link>
            </>
          }
        </Nav>
      </Container>
    </NavbarBS>
  );
}
