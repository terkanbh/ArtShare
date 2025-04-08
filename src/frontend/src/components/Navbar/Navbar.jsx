import { Link, useNavigate } from 'react-router';
import { useUser } from '../../context/UserProvider.jsx';
import { logout } from '../../services/authService.js';
import styles from './Navbar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';

export default function Navbar() {
  const [user, setUser] = useUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    setUser(null);
    navigate('/');
  };

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
              <Link to={'/register'} className='nav-link'> Sign up </Link>
            </>
            : <>
              <Link to={`/users/${user.id}`} className={'nav-link ' + styles.linkIcon}>
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
