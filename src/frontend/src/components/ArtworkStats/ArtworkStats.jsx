import { useUser } from '../../context/UserProvider.jsx';
import styles from './ArtworkStats.module.css';
import Button from 'react-bootstrap/Button';

export default function ArtworkStats({artworkId, likes, comments}) {
  const [currentUser] = useUser();

  return (
      <div className={styles.stats}>
        <Button variant="link" className={styles.count} disabled={currentUser === null}>
          <i className="bi bi-star-fill"></i>
          <span className={styles.btnCount}> {likes} </span>
        </Button>
        <Button variant="link" className={styles.count} disabled>
          <i className="bi bi-chat-dots-fill"></i>
          <span className={styles.btnCount}> {comments} </span>
        </Button>
      </div>
    );
}