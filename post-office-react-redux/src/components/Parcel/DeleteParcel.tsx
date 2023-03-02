import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { getParcelById, deleteAParcel } from '../../features/ParcelSlice'
import { SyntheticEvent, useState } from 'react'
import { Parcel, defaultParcel } from '../interfaces/parcelInterface'
import { Container, Button, Form, InputGroup } from 'react-bootstrap'

/**
 *
 * @returns Looks into the individual parcel and deletes it
 */
const DeleteParcel = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  let { parcelId } = useParams()
  let parcel_Id: string = '0'
  if (!parcelId) {
    parcelId = '0'
  }
  parcel_Id = parcelId
  console.log({ parcel_Id })

  const parcels = useSelector((state: RootState) =>
    getParcelById(state, parcel_Id)
  )

  const [parcel_no, setParcelNo] = useState(parcels?.parcel_no)
  const [parcel_weight, setParcelW] = useState(parcels?.parcel_weight)
  const [status, setStatus] = useState(parcels?.status)
  const [estimated_delivery_days, setEDD] = useState(
    parcels?.estimated_delivery_days
  )
  const [errorMessage, setErrorMessage] = useState<string>('')

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()
    console.log('INSide the submit handler')
    try {
      dispatch(deleteAParcel(parcel_Id))
      navigate('/parcels')
      window.location.reload()
    } catch (error) {
      setErrorMessage('Parcel Not Found')
      console.log('errormessage: ', errorMessage)
    }
  }

  // if (parcel_Id === '0') {
  //   return (
  //     <>
  //       <section data-testid="deleteParcel" > </section>
  //     </>
  //   )
  // } else {
    return (
      <Container className="deleteParcel" data-testid="deleteParcel">
        <h4 className='text-center text-white'> Deleting the Parcel </h4>
        <Form onSubmit={submitHandler}   >
          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>Parcel no. </InputGroup.Text>
            <Form.Control
              type='text'
              aria-label='parcel_weight'
              aria-describedby='basic-addon1'
              size='sm'
              name='parcel_no'
              value={parcel_no}
              onChange={event => setParcelNo(Number(event.target.value))}
            />
          </InputGroup>

          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>Weight (kg)</InputGroup.Text>
            <Form.Control
              type='text'
              aria-label='parcel_weight'
              aria-describedby='basic-addon1'
              size='sm'
              name='parcel_weight'
              value={parcel_weight}
              onChange={event => setParcelW(Number(event.target.value))}
            />
          </InputGroup>

          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>status</InputGroup.Text>
            <Form.Control
              type='text'
              aria-label='status'
              aria-describedby='basic-addon1'
              size='sm'
              name='status'
              value={status}
              onChange={event => setStatus(event.target.value)}
            />
          </InputGroup>

          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>
              estimated_delivery_days
            </InputGroup.Text>
            <Form.Control
              type='text'
              aria-label='estimated_delivery_days'
              aria-describedby='basic-addon1'
              size='sm'
              name='estimated_delivery_days'
              value={estimated_delivery_days}
              onChange={event => setEDD(Number(event.target.value))}
            />
          </InputGroup>

          <Button type='submit' className='button' data-testid='parcelButton'>Delete Parcel Details</Button>
          <p>{errorMessage} </p>
        </Form>
      </Container>
    )
  }


export default DeleteParcel
