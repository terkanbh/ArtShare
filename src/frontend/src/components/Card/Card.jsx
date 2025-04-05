import styles from './Card.module.css';
import CardBS from 'react-bootstrap/Card';
import PostHeader from '../PostHeader/PostHeader.jsx';
import { Link } from 'react-router';

export default function Card({artwork, user}) {

  return (
    <CardBS className={styles.card}>
      <PostHeader user={user} createdAt={artwork.createdAt}/>
      <Link to={`artworks/${artwork.id}`}>
        <CardBS.Img src={artwork.imageUrl} className={styles.img}/>
      </Link>
    </CardBS>
  );
}