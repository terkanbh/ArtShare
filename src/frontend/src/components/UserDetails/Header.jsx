import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Header.module.css';

export default function Header() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className={styles.col}>
          <div className={styles.imageWrapper}>
            <img
              src="/users/default.webp"
              alt="Avatar"
              className="rounded-circle img-fluid"
              width="120" height="120" />
          </div>
          <span className={styles.userName}>
            hziyech
          </span>
        </Col>
      </Row>
    </Container>
  );
}