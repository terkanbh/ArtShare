import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from '../Card/Card.jsx';

export default function Home() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card />
        </Col>
      </Row>
    </Container>
  );
}