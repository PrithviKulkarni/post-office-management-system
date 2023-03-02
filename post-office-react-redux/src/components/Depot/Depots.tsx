
import { Accordion } from 'react-bootstrap'

import { getAllDepots } from '../../features/DepotSlice'

import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const AllDepots = () => {
  const depots = useAppSelector(getAllDepots)

  return (
    <div data-testid='depotsPage'>
      <Accordion defaultActiveKey='0'>
        {depots.map(depot => (
          <Accordion.Item eventKey={depot.id}>
            <Accordion.Header>
              <h3>{depot.city}</h3>
            </Accordion.Header>
            <Accordion.Body className='bg-info'>
              The {depot.city} depot has {depot.workers} workers assigned.
              <div>
                <Link to={`/depots/${depot.id}`}>See Services</Link>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export default AllDepots
