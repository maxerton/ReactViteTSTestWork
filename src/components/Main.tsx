import { Breadcrumb, Button, Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks";
import AccountTable from "./AccountTable";
import { goBack, goGome } from "../store/dataSlice";
import ProfileTable from "./ProfileTable";
import CampaignsTable from "./CampaignsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import CampaignCard from "./CampaignCard";

const Main = () => {
  const dir = useAppSelector((state) => state.data.currentDir)
  const dispatch = useAppDispatch()

  const getBC = () => {
    const ret: JSX.Element[] = []
    dir.forEach((el, index) => {
      ret.push(<Breadcrumb.Item key={index} onClick={() => dispatch(goBack(index))}>{el.bName}</Breadcrumb.Item>)
    })
    return ret
  }

  const getContent = () => {
    if (dir.length === 0) return <AccountTable></AccountTable>
    else if (dir.length === 1) return <ProfileTable></ProfileTable>
    else if (dir.length === 2) return <CampaignsTable></CampaignsTable>
    else if (dir.length === 3) return <CampaignCard></CampaignCard>
  }

  const getTitle = () => {
    const countOf = dir.length
    return [
      'Accounts',
      'Profiles',
      'Campaings',
      'Campaing',
    ][countOf]
  }

  return (
    <div className="mt-3">
      <Card>
        <Card.Title className="mt-3">
          <h4 className="text-center">
            {getTitle()}
          </h4>
        </Card.Title>
        <Card.Body>
          {
            dir.length !== 0 && <Button variant="" onClick={() => dispatch(goBack(-1))}><FontAwesomeIcon icon={faArrowRotateBack}></FontAwesomeIcon></Button>
          }
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => dispatch(goGome())}>
              Home
            </Breadcrumb.Item>
            {
              getBC()
            }
          </Breadcrumb>
          {
            getContent()
          }
        </Card.Body>
      </Card>
    </div>
  );
};

export default Main;