import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from './components/MyNavbar.jsx';
import MyCard from './components/MyCard.jsx';

function App() {
  return (
    <Container fluid='sm' className="p-0 overflow-hidden">
      <MyNavbar />
      <Row>
        <Col style={{display: 'flex', justifyContent: 'center'}}>
          <br/>
          <MyCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App
