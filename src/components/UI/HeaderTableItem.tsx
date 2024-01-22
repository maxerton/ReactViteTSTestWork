import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';

interface props {
  children: JSX.Element | JSX.Element[] | string | undefined,
  sort: string,
  setSort: CallableFunction,
  width: number,
  name: string
}

const HeaderTableItem = (props: props) => {
  const { children, sort, setSort, width, name } = props
  const upDown = sort.split('_').length > 1
  return (
    <Col xs={12} md={width} onDoubleClick={() => setSort('')} onClick={() => setSort(name)}>
      <b style={{cursor: 'pointer', userSelect: 'none'}}>
        {children}
        {' '}
        {
          sort.replace('_', '') === name && 
          (upDown ? <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon> : <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>)
        }
      </b>
    </Col>
  );
};

export default HeaderTableItem;