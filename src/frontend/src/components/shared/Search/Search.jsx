import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import styles from './Search.module.css';
import { getUsers } from '../../../services/usersService.js';

function SearchList({ users }) {
  const navigate = useNavigate();

  const handleNavigate = userId => navigate(`/users/${userId}`);

  return (
    users.length === 0 ? 'No results' :
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center align-middle">
            <i className="bi bi-person-fill"></i>
          </th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(u =>
            <tr key={u.id} className={styles.rowWrapper} onClick={_ => handleNavigate(u.id)}>
              <td className="text-center align-middle">
                <img className={styles.image} src={u.imageUrl} alt="" />
              </td>
              <td className="align-middle">{`${u.firstName} ${u.lastName}`}</td>
              <td className="align-middle">{u.email}</td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
}

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(_ => {
    getUsers()
      .then(usersRes => {
        setUsers(usersRes);
        setFilteredUsers(usersRes);
        setLoading(false);
      })
      .catch(e => console.error(e));
  }, [])


  const handleSubmit = _ => {
    setFilteredUsers(users.filter(u =>
      u.email.substr(0, u.email.indexOf('@')).includes(input) ||
      u.firstName.includes(input) ||
      u.lastName.includes(input)));
  }

  const handleClear = _ => {
    setFilteredUsers(users);
    setInput('');
  }

  return (
    <Container className="mb-3">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <div className={styles.inputWrapper}>
            <Form.Control type="text" onChange={e => setInput(e.target.value)} value={input} />
            <Button variant="primary" onClick={handleSubmit}>
              <i className="bi bi-search"></i>
            </Button>
            <Button variant="danger" onClick={handleClear}>
              <i className="bi bi-x-square"></i>
            </Button>
          </div>
          {
            !loading &&
            <div className={styles.usersWrapper}>
              <SearchList users={filteredUsers} />
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
}
