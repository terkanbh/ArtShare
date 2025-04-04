import styles from './MyCard.module.css';
import Card from 'react-bootstrap/Card';
import PostHeader from '../PostHeader/PostHeader.jsx';
import { Link } from 'react-router';

export default function MyCard() {
  return (
    <Card className={styles.card}>
      <PostHeader />
      <Link to={`artworks/${1}`}>
        <Card.Img src="/artworks/default.webp" className={styles.img}/>
      </Link>
    </Card>
  );
}