import { Button, Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { goBack } from '../store/dataSlice';

const CampaignTable = () => {
  const init = useAppSelector(state => state.data.init)
  const dir = useAppSelector(state => state.data.currentDir)
  const campaign = init[dir[0].bIndex].elements[dir[1].bIndex].elements[dir[2].bIndex]
  const dispatch = useAppDispatch()

  return (
    <div className="d-flex justify-content-center">
      <Card className='text-center my-4 px-4' style={{ maxWidth: '500px' }}>
        <Card.Title className='py-3'>
          {campaign.campaignId}
        </Card.Title>
        <Card.Body>
          <h4>Clicks: {campaign.clicks}</h4>
          <h4>Cost: {campaign.cost} $</h4>
          <h4>Date: {campaign.date.toLocaleDateString()} {campaign.date.toLocaleTimeString()}</h4>
          <Button variant='info' className='my-3' onClick={() => dispatch(goBack(-1))}>
            <h4><FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>{' Back to last table'}</h4>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CampaignTable;