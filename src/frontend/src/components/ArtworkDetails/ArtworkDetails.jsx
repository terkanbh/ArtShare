import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './Image.jsx';
import Description from './Description.jsx';

export default function ArtworkDetails() {
  const { id } = useParams();

  return (
    <Container fluid className="mb-3">
      <Row >
        <Col md={12} xl={7}>
          <Image />
        </Col>
        <Col md={12} xl={5}>
          <Description />
        </Col>
      </Row>
    </Container>
  );
}
