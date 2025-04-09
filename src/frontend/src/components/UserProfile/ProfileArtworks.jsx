import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';
import styles from './ProfileArtworks.module.css';

export default function ProfileArtworks({artworks}) {
  const imagesView = artworks.map(a => 
    <Col sm={12} md={6} lg={4} key={a.id}>
      <Link to={`/artworks/${a.id}`}>
        <div className={styles.imageWrapper}>
          <img src={a.imageUrl + `?timestamp=${new Date().getTime()}`} alt="artwork-image" className={styles.img} />
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