import styles from './Image.module.css'

export default function Image({imageUrl}) {
  return (
    <div className={styles.imageWrapper}>
      <img src={imageUrl} className={styles.img} />
    </div>
  );
}