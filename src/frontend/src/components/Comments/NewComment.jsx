import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './NewComment.module.css';
import { useArtwork, useArtworkDispatch } from '../../context/ArtworkContextProvider.jsx';
import { createComment } from '../../services/commentsService.js';

export default function NewComment() {
  const artworkDetails = useArtwork();
  const artworkDispatch = useArtworkDispatch();
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (!isValid) setIsValid(true);
  }

  const postComment = () => {
    if (input.trim() === '') {
      setIsValid(false);
      return;
    }
    
    createComment(artworkDetails.artwork.id, {text: input})
      .then(data => {
        artworkDispatch({type: 'comment', comment: data});
        setInput('');
      })
      .catch(e => setInput(e));
  }

  return (
    <div className={styles.newComment}>
      <div className={styles.inputWrapper}>
        <Form.Control as="textarea" rows={2} isInvalid={!isValid} onChange={handleChange} value={input}/>
        <Form.Control.Feedback type="invalid"> Comment should not be empty </Form.Control.Feedback>
      </div>
      <Button variant="primary" onClick={postComment}>
        <i className="bi bi-send-fill"></i>
      </Button>
    </div>
  );
}