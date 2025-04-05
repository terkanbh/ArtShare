import { useUser } from '../../context/UserProvider.jsx';
import styles from './Description.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useArtwork } from '../../context/ArtworkContextProvider.jsx';
import Comment from '../Comment/Comment.jsx';
import ArtworkStats from '../ArtworkStats/ArtworkStats.jsx';

export default function Description() {
  const [currentUser] = useUser();
  const artworkDetails = useArtwork();

  return (
    <div className={styles.description}>

      {/* STATS */}
      <ArtworkStats />

      {/* COMMENTS */}
      <div className={styles.comments}>
        <Comment user={artworkDetails.user} text={artworkDetails.artwork.description} createdAt={artworkDetails.artwork.createdAt} />
        {
          artworkDetails.comments.map(c =>
          <Comment key={c.id} user={c.user} text={c.text} createdAt={c.createdAt} />)
        }
      </div>

      {/* NEW COMMENT */}
      {
        currentUser &&
        <div className={styles.newComment}>
          <Form.Control as="textarea" rows={2} />
          <Button variant="primary">
            <i className="bi bi-send-fill"></i>
          </Button>
        </div>
      }
    </div>
  );
}
