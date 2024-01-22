import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

interface propsType {
  page: number,
  setPage: CallableFunction,
  countPages: number
}

const Pager = (props: propsType) => {
  const {page, setPage, countPages} = props

  useEffect(() => {
    if (page > countPages) {
      countPages !== 0 && setPage(countPages)
    }
  }, [page, countPages, setPage])
  return (
    <Pagination className="mt-3">
      <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : page)}></Pagination.Prev>
      {
        [...Array(countPages).keys()].map(e => e + 1).map(pg => (
          <Pagination.Item key={pg} active={page === pg} onClick={() => pg !== page && setPage(pg)}>{pg}</Pagination.Item>
        ))
      }
      <Pagination.Next onClick={() => setPage(page < countPages ? page + 1 : page)}></Pagination.Next>
    </Pagination>
  );
};

export default Pager;