import { Link } from 'react-router';
import styles from './PostHeader.module.css';

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}

export default function PostHeader({user, createdAt}) {

  return (
    <div className={styles.postHeader}>
      <Link to={`/users/${user.id}`} className={styles.postLink}>
        <img
          src="/users/default.webp"
          alt="Avatar"
          className="rounded-circle img-fluid"
          width="40" height="40" />
        <span className={styles.userName}><strong> {user.email} </strong></span>
      </Link>
      <span className={"text-muted " + styles.posted}> {formatDate(createdAt)} </span>
    </div>
  );
}
