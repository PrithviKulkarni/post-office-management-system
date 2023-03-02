import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../app/store'
import { getDepotById } from '../../features/DepotSlice'

const DepotDetails = () => {
  let { depId } = useParams()

  let depotId: string = '0'

  if (!depId) {
    depId = '0'
  }
  depotId = depId

  const depots = useSelector((state: RootState) => getDepotById(state, depotId))

  if (!depots) {
    return (
      <>
        <section data-testid="depotDetails" ></section>
      </>
    )
  } else {
    return (
      <div data-testid="depotDetails">
        <div className='card'>
          <h1>{depots.city} Depot</h1>
          <div className='card-header'>Special Services</div>
          <ul className='list-group list-group-flush'>
            {depots?.services.map(service => (
              <li className='list-group-item' key={service.service}>
                {' '}
                Service: {service.service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default DepotDetails
