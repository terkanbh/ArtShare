import { useUser } from '../../context/UserProvider.jsx';
import styles from './Description.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Comment from '../Comment/Comment.jsx';
import ArtworkStats from '../ArtworkStats/ArtworkStats.jsx';

export default function Description({ artwork, user, comments }) {
  const [currentUser] = useUser();

  return (
    <div className={styles.description}>

      {/* STATS */}
      <ArtworkStats artworkId={artwork.id} likes={artwork.likes} comments={artwork.comments} />

      {/* COMMENTS */}
      <div className={styles.comments}>
        <Comment user={user} text={artwork.description} createdAt={artwork.createdAt} />
        { comments.map(c => <Comment key={c.id} user={c.user} text={c.text} createdAt={c.createdAt} />) }
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
