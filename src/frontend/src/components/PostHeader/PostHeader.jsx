import { Link } from 'react-router';
import styles from './PostHeader.module.css';

export default function PostHeader() {
  return (
    <div className={styles.postHeader}>
      <Link to={`/users/${1}`} className={styles.postLink}>
        <img
          src="/users/default.webp"
          alt="Avatar"
          className="rounded-circle img-fluid"
          width="40" height="40" />
        <span className={styles.userName}><strong> hziyech </strong></span>
      </Link>
      <span className={"text-muted " + styles.posted}> 3h ago </span>
    </div>
  );
}
