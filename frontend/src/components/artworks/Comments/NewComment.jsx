import { useState } from 'react';
import { createComment } from '../../../services/commentsService.js';
import { useArtworkDetails, useArtworkDetailsDispatch } from '../../../hooks/useArtworkDetails.jsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './NewComment.module.css';

export default function NewComment() {
  const artworkDetails = useArtworkDetails();
  const artworkDetailsDispatch = useArtworkDetailsDispatch();

  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (!isValid) setIsValid(true);
  }

  const handleSubmit = () => {
    if (input.trim() === '') {
      setIsValid(false);
      return;
    }
    
    createComment(artworkDetails.artwork.id, {text: input})
      .then(data => {
        artworkDetailsDispatch({type: 'comment', comment: data});
        setInput('');
      })
      .catch(e => setInput(e)); // TODO: add notifications
  }

  return (
    <div className={styles.newComment}>
      <div className={styles.inputWrapper}>
        <Form.Control as="textarea" rows={2} isInvalid={!isValid} onChange={handleChange} value={input}/>
        <Form.Control.Feedback type="invalid"> Comment should not be empty </Form.Control.Feedback>
      </div>
      <Button variant="primary" onClick={handleSubmit}>
        <i className="bi bi-send-fill"></i>
      </Button>
    </div>
  );
}