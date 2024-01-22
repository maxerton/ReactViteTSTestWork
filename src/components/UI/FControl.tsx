import { Col, Form, Row } from 'react-bootstrap';

interface propsType {
  count: number,
  setCount: CallableFunction,
  filter: string,
  setFilter: CallableFunction
}

const FControl = (props: propsType) => {
  const {count, setCount, filter, setFilter} = props
  return (
    <Row className="my-3">
      <Col xs={2}>
        <Form.Select size="sm" value={count} onChange={val => setCount(Number.parseInt(val.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Form.Select>
      </Col>
      <Col xs={10}>
        <Form.Control value={filter} onChange={el => setFilter(el.target.value)} size="sm" placeholder="Filter"></Form.Control>
      </Col>
    </Row>
  );
};

export default FControl;