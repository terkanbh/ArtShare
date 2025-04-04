import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';
import styles from './Images.module.css';
import { images } from './images.js';

export default function Images() {
  const imagesView = images.map(x => 
    <Col sm={12} md={6} lg={4} key={x.id}>
      <Link to={`/artworks/${1}`}>
        <div className={styles.imageWrapper}>
          <img src={x.src} alt="artwork-image" className={styles.img} />
        </div>
      </Link>
    </Col>
  );

  return (
    <Container className="mb-3">
      <Row className="g-3">
        {imagesView}
      </Row>
    </Container>
  );
}