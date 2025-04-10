import { Link } from 'react-router';
import CardBS from 'react-bootstrap/Card';

import styles from './Card.module.css';
import PostHeader from '../PostHeader/PostHeader.jsx';

export default function Card({artwork, user}) {
  return (
    <CardBS className={styles.card}>
      <PostHeader user={user} createdAt={artwork.createdAt}/>
      <Link to={`artworks/${artwork.id}`}>
        <CardBS.Img src={artwork.imageUrl + `?timestamp=${new Date().getTime()}`} className={styles.img}/>
      </Link>
    </CardBS>
  );
}
