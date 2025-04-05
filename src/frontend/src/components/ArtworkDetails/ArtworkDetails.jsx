import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getArtwork } from '../../services/artworksService.js';
import { useArtwork, useArtworkDispatch } from '../../context/ArtworkContextProvider.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './Image.jsx';
import Description from './Description.jsx';

export default function ArtworkDetails() {
  const { id } = useParams();
  const artworkDetails = useArtwork();
  const artworkDispatch = useArtworkDispatch();

  useEffect(() => {
    getArtwork(id)
    .then(data => {
      artworkDispatch({type: 'fetch', artwork: data});
    })
    .catch(err => console.log(err));
  }, [id])

  return (
      artworkDetails &&
      <Container fluid className="mb-3">
          <Row >
            <Col md={12} xl={7}>
              <Image imageUrl={artworkDetails.artwork.imageUrl}/>
            </Col>
            <Col md={12} xl={5}>
              <Description />
            </Col>
          </Row>
      </Container>
  );
}
