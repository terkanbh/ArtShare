import styles from './Image.module.css'

export default function Image() {
  return (
    <div className={styles.imageWrapper}>
      <img src='/artworks/default.webp' className={styles.img} />
    </div>
  );
}