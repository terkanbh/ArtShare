import styles from './Description.module.css';
import ArtworkStats from '../ArtworkStats/ArtworkStats.jsx';
import Comments from '../Comments/Comments.jsx';

export default function Description() {

  return (
    <div className={styles.description}>
      {/* STATS */}
      <ArtworkStats />

      {/* COMMENTS */}
      <Comments />
    </div>
  );
}
