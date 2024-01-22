import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks";
import { profileSwitchToCampaigns } from "../store/dataSlice";
import { useState } from "react";
import { profileType } from "../store/dataSlice";
import HeaderTableItem from "./UI/HeaderTableItem";
import FControl from "./UI/FControl";
import Pager from "./UI/Pager";

const ProfileTable = () => {
  const init = useAppSelector(state => state.data.init)
  const dir = useAppSelector(state => state.data.currentDir)
  const profiles = init[dir[0].bIndex].elements
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(10)
  const [sorted, setSorted] = useState<string>('')
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState<string>('')

  const fProf = profiles.filter(el => {
    if (filter === '') return true
    else {
      const re = new RegExp(filter, 'gi')
      return re.test(el.country) || re.test(el.marketplace)
    }
  })

  const countPages: number = Math.ceil(fProf.length / count)

  const render = () => {
    const sortedArray: profileType[] = fProf.sort((a: profileType, b: profileType) => {
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
        case 'country':
        case 'country_':
          return compareStr(a.country, b.country)
        case 'marketplace':
        case 'marketplace_':
          return compareStr(a.marketplace, b.marketplace)
        default:
          return a.profileId - b.profileId
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
        <ListGroup.Item className="text-center d-none d-md-block">
          <Row>
            <Col xs={12} md={1}><b>Id</b></Col>
            <HeaderTableItem sort={sorted} setSort={setSort} width={5} name="country">Country</HeaderTableItem>
            <HeaderTableItem sort={sorted} setSort={setSort} width={5} name="marketplace">Marketplace</HeaderTableItem>
            <Col xs={12} md={1}><b>Count</b></Col>
          </Row>
        </ListGroup.Item>
        {
          render().map((el, index) => (
            <ListGroup.Item key={el.profileId} onClick={() => dispatch(profileSwitchToCampaigns({ bName: el.country, bIndex: index }))} action className="text-center">
              <Row>
                <Col xs={12} md={1} className="d-none d-md-block">{el.profileId}</Col>
                <Col xs={12} md={5}>{el.country}</Col>
                <Col xs={12} md={5}>{el.marketplace}</Col>
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

export default ProfileTable;