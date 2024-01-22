import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { accType } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks";
import { accountSwitchToProfile } from "../store/dataSlice";
import { useState } from "react";
import HeaderTableItem from "./UI/HeaderTableItem";
import FControl from "./UI/FControl";
import Pager from "./UI/Pager";

const AccountTable = () => {
  const accounts = useAppSelector(state => state.data.init)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(10)
  const [sorted, setSorted] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  const fAcc = accounts.filter(el => {
    if (filter === '') return true
    else {
      const re = new RegExp(filter, 'gi')
      return re.test(el.email) || re.test(el.name)
    }
  })

  const countPages: number = Math.ceil(fAcc.length / count)

  const render = () => {
    const sortedArray: accType[] = fAcc.sort((a: accType, b: accType) => {
      const compareStr = (a: string, b: string) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      }
      switch (sorted) {
        case 'email':
        case 'email_':
          return compareStr(a.email, b.email)
        case 'name':
        case 'name_':
          return compareStr(a.name, b.name)
        case 'creationDate':
        case 'creationDate_':
          return a.creationDate.getTime() - b.creationDate.getTime()
        default:
          return a.accountId - b.accountId
      }
    })
    if (sorted.split('_').length > 1) {
      sortedArray.reverse()
    }
    const rez = sortedArray.slice((page - 1) * count, page * count)
    return rez
  }

  const setSort = (typeS: string) => {
    if (typeS === '') {
      setSorted('')
      return
    }
    if (typeS !== sorted) {
      setSorted(typeS)
    } else {
      typeS.split('_').length === 0 ?
        setSorted(typeS.replace('_', '')) :
        setSorted(typeS + "_")
    }
  }

  return (
    <>
      <FControl count={count} setCount={setCount} filter={filter} setFilter={setFilter}></FControl>
      <ListGroup >
        <ListGroup.Item className="text-center">
          <Row>
            <Col xs={12} md={1} className="d-none d-md-block"><b>Id</b></Col>
            <HeaderTableItem sort={sorted} setSort={setSort} width={4} name="email">Email</HeaderTableItem>
            <HeaderTableItem sort={sorted} setSort={setSort} width={3} name="name">Name</HeaderTableItem>
            <HeaderTableItem sort={sorted} setSort={setSort} width={3} name="creationDate">Creation Date</HeaderTableItem>
            <Col xs={12} md={1} className="d-none d-md-block"><b>Count</b></Col>
          </Row>
        </ListGroup.Item>
        {
          render().map((el: accType, index: number) => (
            <ListGroup.Item key={el.name} onClick={() => dispatch(accountSwitchToProfile({ bName: el.name, bIndex: index }))} action className="text-center">
              <Row>
                <Col xs={12} md={1} className="d-none d-md-block">{el.accountId}</Col>
                <Col xs={12} md={4}>{el.email}</Col>
                <Col xs={12} md={3}>{el.name}</Col>
                <Col xs={12} md={3}>{el.creationDate.toLocaleString()}</Col>
                <Col xs={12} md={1} className="d-none d-md-block"><Badge>{el.elements.length}</Badge></Col>
              </Row>
            </ListGroup.Item>
          ))
        }
        <ListGroup.Item className="d-flex justify-content-center">
          <Pager page={page} setPage={setPage} countPages={countPages} />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default AccountTable;
