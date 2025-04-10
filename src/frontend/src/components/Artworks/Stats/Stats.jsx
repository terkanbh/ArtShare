import { Link } from 'react-router';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useArtworkDetails, useArtworkDetailsDispatch } from '../../../hooks/useArtworkDetails.jsx';
import { toggleLikeArtwork } from '../../../services/artworksService.js';
import styles from './Stats.module.css';
import Button from 'react-bootstrap/Button';

export default function ArtworkStats() {
  const [auth] = useAuth();
  const artworkDetails = useArtworkDetails();
  const artworkDetailsDispatch = useArtworkDetailsDispatch();

  const handleLike = () => {
    toggleLikeArtwork(artworkDetails.artwork.id)
      .then(data => {
        artworkDetailsDispatch({
          type: 'toggleLike',
          status: data.status,
          totalLikes: data.totalLikes
        });
      });
  }

  return (
      <div className={styles.stats}>
        <Button variant="link" className={artworkDetails.likedByCurrentUser ? styles.liked : styles.notLiked} onClick={handleLike} disabled={!auth} >
          <i className={"bi bi-star-fill"}> </i>
          <span>  {artworkDetails.artwork.totalLikes} </span>
        </Button>
        <Button variant="link" className={styles.count} disabled>
          <i className="bi bi-chat-dots-fill"></i>
          <span> {artworkDetails.artwork.totalComments} </span>
        </Button>
        {
          auth && auth.id === artworkDetails.user.id &&
          <Link to={`/artworks/settings/${artworkDetails.artwork.id}`} className={'nav-link ' + styles.linkIcon}>
            <i className="bi bi-gear-fill"></i>
          </Link>
        }
      </div>
    );
}
