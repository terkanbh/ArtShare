import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './ProfileHeader.module.css';

export default function ProfileHeader({user}) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className={styles.col}>
          <div className={styles.imageWrapper}>
            <img
              src={user.imageUrl}
              alt="Avatar"
              className="rounded-circle img-fluid"
              width="120" height="120" />
          </div>
          <span className={styles.userName}>
            {user.firstName + ' ' + user.lastName}
          </span>
        </Col>
      </Row>
    </Container>
  );
}