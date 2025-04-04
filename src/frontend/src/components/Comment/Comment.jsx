import PostHeader from '../PostHeader/PostHeader.jsx';

export default function Comment({user, text, createdAt}) {
  return (
  <>
    <PostHeader user={user} createdAt={createdAt} />
    <div> { text } </div>
    <hr />
  </>);
}
