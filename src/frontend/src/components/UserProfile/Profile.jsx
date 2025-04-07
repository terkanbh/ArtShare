import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileHeader from './ProfileHeader.jsx';
import ProfileArtworks from './ProfileArtworks.jsx';
import { getUserWithArtworks } from '../../services/usersService.js';

export default function Profile() {
  const { id } = useParams();
  const [ userWithArtworks, setUserWithArtworks ] = useState(null)

  useEffect(() => {
    getUserWithArtworks(id)
      .then(res => setUserWithArtworks(res))
      .catch(err => console.error(err));
  }, [id])

  return ((
    userWithArtworks &&
    (
      <Container md={10}>
        <Row className="justify-content-center">
          <Col>
            <ProfileHeader user={userWithArtworks.user}/>
            <br />
            <hr />
            {
              userWithArtworks.artworks.length !== 0
              ?  <ProfileArtworks artworks={userWithArtworks.artworks}/>
              : <p>{userWithArtworks.user.firstName} {userWithArtworks.user.lastName} has not added any artworks yet!</p>
            }
          </Col>
        </Row>
      </Container>
    )
  ));
}