import { useArtwork } from '../../context/ArtworkContextProvider.jsx';
import { useUser } from '../../context/UserProvider.jsx';
import styles from './Comments.module.css';
import Comment from './Comment.jsx';
import NewComment from './NewComment.jsx';

export default function ArtworkComments() {
  const currentUser = useUser()[0];
  const artworkDetails = useArtwork();
  const artworkUser = artworkDetails.user;
  const artworkDescription = artworkDetails.artwork.description;
  const artworkDate = artworkDetails.artwork.createdAt;
  const commentsMap = artworkDetails.comments.map(c =>
    <Comment key={c.id} user={c.user} text={c.text} createdAt={c.createdAt} />);

  return (
    <>
      <div className={styles.comments}>
        {/* Artwork description is added as a comment */}
        <Comment user={artworkUser} text={artworkDescription} createdAt={artworkDate} />

        {/* Comments */}
        {commentsMap}
      </div>

      {/* New comment */}
      { currentUser && <NewComment /> }
    </>
  );
}
