import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './Image.jsx';
import Description from './Description.jsx';

export default function ArtworkDetails() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/artworks/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setArtwork(data.artwork);
        setUser(data.user);
        setComments(data.comments);
        setLikedByCurrentUser(data.likedByCurrentUser)
      })
      .catch(err => console.log(err));
  }, [id])

  return (
    <Container fluid className="mb-3">
      {
        (artwork && user && comments) &&
        <Row >
          <Col md={12} xl={7}>
            <Image imageUrl={artwork.imageUrl} />
          </Col>
          <Col md={12} xl={5}>
            <Description
              artwork={artwork}
              user={user}
              comments={comments}
              likedByCurrentUser={likedByCurrentUser}
            />
          </Col>
        </Row>
      }
    </Container>
  );
}
