import { useAuth } from '../../../hooks/useAuth.jsx';
import { useArtworkDetails } from '../../../hooks/useArtworkDetails.jsx';
import styles from './Comments.module.css';
import NewComment from './NewComment.jsx';
import PostHeader from '../../shared/PostHeader/PostHeader.jsx';

function Comment({user, text, createdAt}) {
  return (<>
    <PostHeader user={user} createdAt={createdAt} />
    <div> { text } </div>
    <hr />
  </>);
}

export default function Comments() {
  const auth = useAuth()[0];
  const artworkDetails = useArtworkDetails();

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
      { auth && <NewComment /> }
    </>
  );
}
