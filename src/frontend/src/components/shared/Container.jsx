import ContainerBS from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Container({ sm = 12, md = sm, lg = md, children }) {
  return (
    <ContainerBS>
      <Row className="justify-content-center mb-3">
        <Col sm={sm} md={md} lg={lg}>
          {children}
        </Col>
      </Row>
    </ContainerBS>
  );
}