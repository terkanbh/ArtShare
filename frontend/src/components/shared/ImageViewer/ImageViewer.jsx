import styles from './ImageViewer.module.css';

export default function ImageViewer({ imageUrl, showFile = false, file = null }) {
  return (
    <div className={styles.imageContainer}>
      {
        showFile && file && file.type === 'image/webp'
        ? <img className={styles.img} src={URL.createObjectURL(file)} />
        : <img className={styles.img} src={imageUrl} />
      }
    </div>
  );
}