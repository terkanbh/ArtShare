import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px'
}

export default function MyCard({ user }) {
  return (
    <Card style={{border: 'none', maxWidth: '576px'}}>
      <div className="header" style={headerStyle}>
        <img 
          src="/users/default.webp"
          alt="Avatar"
          className="rounded-circle img-fluid"
          width="40" height="40"/>
        <span><strong> hziyech </strong></span> 
        <span className="text-muted" style={{marginLeft: 'auto'}}> 3h ago </span>
      </div>
      <Card.Img src="/artworks/default.webp" style={{borderRadius: 0}}/>
      <div className="header" style={headerStyle}>
        <Button variant="secondary">
          <i className="bi bi-star-fill"></i>
          <span style={{fontWeight: 200, marginLeft: '5px'}}> 22 </span>
        </Button>
        <Button variant="secondary">
          <i className="bi bi-chat-dots-fill"></i>
          <span style={{fontWeight: 200, marginLeft: '5px'}}> 31 </span>
        </Button>
      </div>
    </Card>
  );
}