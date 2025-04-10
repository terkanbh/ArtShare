import { Link } from 'react-router';
import CardBS from 'react-bootstrap/Card';

import styles from './Card.module.css';
import PostHeader from '../PostHeader/PostHeader.jsx';

export default function Card({artwork, user}) {
  return (
    <CardBS className={styles.card}>
      <div className={styles.headerAndStatsWrapper}>
        <div className={styles.headerWrapper}>
          <PostHeader user={user} createdAt={artwork.createdAt}/>
        </div>
        <div className={styles.statsWrapper}>
          <span className={styles.likes} disabled>
            <i className={"bi bi-star-fill"}> </i>
            {artwork.totalLikes}
          </span>
          <span className={styles.comments}>
            <i className="bi bi-chat-dots-fill" style={{marginRight: '5px'}}></i>
            {artwork.totalComments}
          </span>
        </div>
      </div>
      <Link to={`artworks/${artwork.id}`}>
        <CardBS.Img src={artwork.imageUrl + `?timestamp=${new Date().getTime()}`} className={styles.img}/>
      </Link>
    </CardBS>
  );
}
