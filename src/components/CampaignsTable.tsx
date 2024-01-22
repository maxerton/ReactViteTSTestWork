import { Col, ListGroup, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useState } from 'react';
import { campaignSwitchToCard, campaignType } from '../store/dataSlice';
import HeaderTableItem from './UI/HeaderTableItem';
import FControl from './UI/FControl';
import Pager from './UI/Pager';

const CampaignsTable = () => {
  const init = useAppSelector(state => state.data.init)
  const dir = useAppSelector(state => state.data.currentDir)
  const campaigns = init[dir[0].bIndex].elements[dir[1].bIndex].elements
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(10)
  const [sorted, setSorted] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  const fCamp = campaigns.filter(el => {
    if (filter === '') return true
    else {
      const re = new RegExp(filter, 'gi')
      return re.test(`${el.clicks}`) || re.test(el.cost)
    }
  })
  
  const countPages: number = Math.ceil(fCamp.length / count)

  const render = () => {
    const sortedArray: campaignType[] = fCamp.sort((a: campaignType, b: campaignType) => {
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
        case 'cost':
        case 'cost_':
          return compareStr(a.cost, b.cost)
        case 'clicks':
        case 'clicks_':
          return a.clicks - b.clicks
        case 'date':
        case 'date_':
          return a.date.getTime() - b.date.getTime()
        default:
          return a.campaignId - b.campaignId
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
        <ListGroup.Item className='text-center d-none d-md-block'>
          <Row>
            <Col xs={12} md={1}>Index</Col>
            <HeaderTableItem sort={sorted} setSort={setSort} width={3} name="cost">Cost</HeaderTableItem>
            <HeaderTableItem sort={sorted} setSort={setSort} width={3} name="clicks">Clicks</HeaderTableItem>
            <HeaderTableItem sort={sorted} setSort={setSort} width={5} name="date">Date</HeaderTableItem>
          </Row>
        </ListGroup.Item>
        {
          render().map((el: campaignType, index: number) => (
            <ListGroup.Item key={el.campaignId} className="text-center" onClick={() => dispatch(campaignSwitchToCard({ bName: `${el.campaignId}`, bIndex: index }))} action>
              <Row>
                <Col xs={12} md={1} className="d-none d-md-block">{el.campaignId}</Col>
                <Col xs={12} md={3}>{el.cost} $</Col>
                <Col xs={12} md={3}>{el.clicks}</Col>
                <Col xs={12} md={5}>{el.date.toLocaleDateString()} {el.date.toLocaleTimeString()}</Col>
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

export default CampaignsTable;