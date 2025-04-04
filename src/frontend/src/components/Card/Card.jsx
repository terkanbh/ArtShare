import styles from './Card.module.css';
import CardBS from 'react-bootstrap/Card';
import PostHeader from '../PostHeader/PostHeader.jsx';
import { Link } from 'react-router';

export default function Card() {
  return (
    <CardBS className={styles.card}>
      <PostHeader />
      <Link to={`artworks/${1}`}>
        <CardBS.Img src="/artworks/default.webp" className={styles.img}/>
      </Link>
    </CardBS>
  );
}