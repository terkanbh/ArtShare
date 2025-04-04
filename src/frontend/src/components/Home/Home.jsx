import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from '../Card/Card.jsx';

export default function Home() {
  const [artworksWithUser, setArtworksWithUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/artworks', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setArtworksWithUser(data))
      .catch(err => console.log(err));
  }, []);

  const artworksMap = artworksWithUser?.map((a, index) =>
    <div key={a.id || index}>
      <Card artwork={a.artwork} user={a.user}/>
      <hr />
    </div>
  );

  return (
    <Container className="mb-3">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          {artworksMap || <p> Loading... </p>}
        </Col>
      </Row>
    </Container>
  );
}