import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getUserWithArtworks } from '../../../services/usersService.js';
import ProfileHeader from './ProfileHeader.jsx';
import ProfileArtworks from './ProfileArtworks.jsx';
import Container from '../../shared/Container.jsx';

export default function Details() {
  const { id } = useParams();
  const [userWithArtworks, setUserWithArtworks] = useState(null)

  useEffect(() => {
    getUserWithArtworks(id)
      .then(res => setUserWithArtworks(res))
      .catch(err => console.error(err));
  }, [id])

  return ((
    userWithArtworks &&
    (
      <Container md={10}>
        <ProfileHeader user={userWithArtworks.user} /> <br /> <hr />
        {
          userWithArtworks.artworks.length !== 0
            ? <ProfileArtworks artworks={userWithArtworks.artworks} />
            : <p>{userWithArtworks.user.firstName} has not added any artworks yet!</p>
        }
      </Container>
    )
  ));
}
