import { comments } from './comments.js';
import styles from './Description.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PostHeader from '../PostHeader/PostHeader.jsx';

export default function Description() {
  const commentsView = comments.map(x => (
    <div key={x.id}>
      <PostHeader />
      <div>
        {x.text}
      </div>
      <hr />
    </div>
  ));

  return (
    <div className={styles.description}>
      <div className={styles.stats}>
        <Button variant="link" className={styles.count}>
          <i className="bi bi-star-fill"></i>
          <span className={styles.btnCount}> 22 </span>
        </Button>
        <Button variant="link" className={styles.count} disabled>
          <i className="bi bi-chat-dots-fill"></i>
          <span className={styles.btnCount}> 31 </span>
        </Button>
      </div>
      <div className={styles.comments}>
        {commentsView}
      </div>
      <div className={styles.newComment}>
        <Form.Control as="textarea" rows={2} />
        <Button variant="primary">
          <i className="bi bi-send-fill"></i>
        </Button>
      </div>
    </div>
  );
}