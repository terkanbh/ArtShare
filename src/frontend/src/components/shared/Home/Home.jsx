import { useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';

import styles from './Home.module.css';

import Card from '../Card/Card.jsx';

function Sort({sortHandler}) {
  const [sortByTitle, setSortByTitle] = useState('Recent Artworks');

  const handleClick = value => {
    switch(value) {
      case 'date': setSortByTitle('Recent Artworks'); break;
      case 'likes': setSortByTitle('Popular Artworks'); break;
      case 'comments': setSortByTitle('Discussed Artworks'); break;
      default: return;
    }

    sortHandler(value);
  }

  return (
    <>
    <div className={styles.sortWrapper}>
      <span className={styles.selectedSort}> {sortByTitle} </span>
      <Dropdown>
        <Dropdown.Toggle variant="link" className={styles.sortLink}>
          Sort by
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={_ => handleClick('date')}> Most Recent </Dropdown.Item>
          <Dropdown.Item onClick={_ => handleClick('likes')}> Most Popular </Dropdown.Item>
          <Dropdown.Item onClick={_ => handleClick('comments')}> Most Discussed </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <hr />
    </>
  );
}

export default function Home() {
  const [artworksWithUser, dispatch] = useImmerReducer(reducer, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/artworks', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        dispatch({type: 'fetch', artworks: data});
        dispatch({type: 'sort', sortBy: 'date'});
      })
      .catch(err => console.log(err));
  }, []);

  const artworksMap = artworksWithUser?.map((a, index) =>
    <div key={a.id || index}>
      <Card artwork={a.artwork} user={a.user} />
      <br/>
    </div>
  );

  const sortHandler = sortBy => dispatch({type: 'sort', sortBy: sortBy});

  return (
    <Container className="mb-3">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Sort sortHandler={sortHandler} />
          {artworksMap || <p> Loading... </p>}
        </Col>
      </Row>
    </Container>
  );
}

function reducer(draft, action) {
  switch (action.type) {
    case 'fetch':
      return action.artworks;
    case 'sort':
      switch (action.sortBy) {
        case 'date':
          draft.sort((a, b) => new Date(b.artwork.createdAt) - new Date(a.artwork.createdAt))
          break;
        case 'likes':
          draft.sort((a, b) => new Date(b.artwork.totalLikes) - new Date(a.artwork.totalLikes))
          break;
        case 'comments':
          draft.sort((a, b) => new Date(b.artwork.totalComments) - new Date(a.artwork.totalComments))
          break;
      }
      break;
  }
}