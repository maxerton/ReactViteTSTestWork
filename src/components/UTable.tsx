import { Col, ListGroup, Row } from "react-bootstrap";


const UTable = ({data=[], onClick=() => {}}) => {
  return (
    <div>
      <ListGroup >
      {
        data.map(el => (
          <ListGroup.Item onClick={() => onClick(el)} action className="text-center">
            <Row>
              <Col xs={12} md={1} className="d-none d-md-block">{el.accountId}</Col>
              <Col xs={12} md={4}>{el.email}</Col>
              <Col xs={12} md={3}>{el.name}</Col>
              <Col xs={12} md={3}>{el.creationDate.toLocaleString()}</Col>
              <Col xs={12} md={1} className="d-none d-md-block"><Badge>{el.profiles.length}</Badge></Col>
            </Row>
            
          </ListGroup.Item>
        ))
      }
    </ListGroup>
    </div>
  );
};

export default UTable;