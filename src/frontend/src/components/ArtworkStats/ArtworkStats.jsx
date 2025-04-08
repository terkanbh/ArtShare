import { Link } from 'react-router';
import { useUser } from '../../context/UserProvider.jsx';
import { toggleLikeArtwork } from '../../services/artworksService.js';
import { useArtwork, useArtworkDispatch } from '../../context/ArtworkContextProvider.jsx';
import styles from './ArtworkStats.module.css';
import Button from 'react-bootstrap/Button';

export default function ArtworkStats() {
  const [currentUser] = useUser();
  const artworkDetails = useArtwork();
  const artworkDispatch = useArtworkDispatch();

  const handleLike = () => {
    toggleLikeArtwork(artworkDetails.artwork.id)
      .then(data => {
        artworkDispatch({
          type: 'toggleLike',
          status: data.status,
          totalLikes: data.totalLikes
        });
      });
  }

  return (
      <div className={styles.stats}>
        <Button variant="link" className={artworkDetails.likedByCurrentUser ? styles.liked : styles.notLiked} onClick={handleLike} disabled={currentUser === null} >
          <i className={"bi bi-star-fill"}> </i>
          <span>  {artworkDetails.artwork.totalLikes} </span>
        </Button>
        <Button variant="link" className={styles.count} disabled>
          <i className="bi bi-chat-dots-fill"></i>
          <span> {artworkDetails.artwork.totalComments} </span>
        </Button>
        {
          currentUser && currentUser.id === artworkDetails.user.id &&
          <Link to={`/artworks/settings/${artworkDetails.artwork.id}`} className={'nav-link ' + styles.linkIcon}>
            <i className="bi bi-gear-fill"></i>
          </Link>
        }
      </div>
    );
}
