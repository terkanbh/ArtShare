import { Link, useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';

import styles from './Navbar.module.css';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { logout } from '../../../services/authService.js';

export default function Navbar() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    setAuth(null);
    navigate('/');
  };

  return (
    <NavbarBS className="bg-body-tertiary">
      <Container>
        <Link to={'/'} className='navbar-brand'> ArtShare </Link>
        <NavbarBS.Toggle />
        <Nav className="justify-content-end">
          {
            !auth
            ? <>
              <Link to={'/login'} className='nav-link'> Login </Link>
              <Link to={'/register'} className='nav-link'> Sign up </Link>
            </>
            : <>
              <Link to={`/users/${auth.id}`} className={'nav-link ' + styles.linkIcon}>
                <i className="bi bi-person"></i>
              </Link>
              <Link to={`/users/settings`} className={'nav-link ' + styles.linkIcon}>
                <i className="bi bi-gear"></i>
              </Link>
              <Link to={`/artworks/new`} className={'nav-link ' + styles.linkIcon}>
                <i className="bi bi-plus-square"></i>
              </Link>
              <span className={'nav-link ' + styles.logout} onClick={logoutHandler}>
                <i className="bi bi-box-arrow-left"></i>
              </span>
            </>
          }
        </Nav>
      </Container>
    </NavbarBS>
  );
}
