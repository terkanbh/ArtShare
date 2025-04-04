import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header.jsx';
import Images from './Images.jsx';

export default function UserDetails() {
  const { id } = useParams();
  return (
    <Container md={10}>
      <Row className="justify-content-center">
        <Col>
          <Header />
          <br />
          <hr />
          <Images />
        </Col>
      </Row>
    </Container>
  );
}