import { useEffect } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getArtwork } from '../../../services/artworksService.js';
import { ArtworkDetailsContextProvider } from '../../../context/ArtworkDetailsContextProvider.jsx';
import { useArtworkDetails, useArtworkDetailsDispatch } from '../../../hooks/useArtworkDetails.jsx';
import styles from './Details.module.css';
import Stats from '../Stats/Stats.jsx';
import Comments from '../Comments/Comments.jsx';

function ArtworkDetails({ id }) {
  const artworkDetails = useArtworkDetails();
  const artworkDetailsDispatch = useArtworkDetailsDispatch();

  useEffect(() => {
    getArtwork(id)
      .then(data => artworkDetailsDispatch({ type: 'fetch', artwork: data}))
      .catch(err => console.log(err));
  }, [id])

  return (
    artworkDetails &&
    <Container fluid className="mb-3">
      <Row >

        {/* Image */}
        <Col md={12} xl={7}>
          <div className={styles.imageWrapper}>
            <img src={artworkDetails.artwork.imageUrl + `?timestamp=${new Date().getTime()}`} className={styles.img} />
          </div>
        </Col>

        {/* Stats and Comments */}
        <Col md={12} xl={5}>
          <div className={styles.description}>
            <Stats />
            <Comments />
          </div>
        </Col>

      </Row>
    </Container>
  );
}

export default function Details() {
  const { id } = useParams();

  return (
    <ArtworkDetailsContextProvider>
      <ArtworkDetails id={id} />
    </ArtworkDetailsContextProvider>
  );
}
