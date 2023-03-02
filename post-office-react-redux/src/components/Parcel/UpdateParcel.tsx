import { useAppDispatch } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { getParcelById, updateAParcel } from '../../features/ParcelSlice'
import { useParams } from 'react-router-dom'
import { Parcel, defaultParcel } from '../interfaces/parcelInterface'
import { Container, Button, Form, InputGroup } from 'react-bootstrap'
import {  SyntheticEvent } from 'react'
/****
 * 
 * @returns shows an update form to edit the parcel details
 */
const UpdateParcel = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams();
  const parcels = useSelector((state: RootState) => getParcelById(state, params.parcelId!))

  const [parcel_no, setParcelNo] = useState<number| undefined>(parcels?.parcel_no)
  const [parcel_weight, setParcelW] = useState<number| undefined>(parcels?.parcel_weight)
  const [status, setStatus] = useState<string| undefined>(parcels?.status)
  const [estimated_delivery_days, setEDD] = useState<number| undefined>(parcels?.estimated_delivery_days)
  const [errorMessage, setErrorMessage] = useState<string>('')



  const submitHandler = (event: SyntheticEvent) => {
    console.log('inside SUbmit Handler')
    event.preventDefault()
    navigate('/parcels')

    const validated = [
      parcel_no,
      parcel_weight,
      status,
      estimated_delivery_days
    ].every(Boolean)

    try {
      if (validated) {
        const updParcelData: Parcel = defaultParcel
        updParcelData.id = params.parcelId!

        if (parcel_no) {updParcelData.parcel_no = parcel_no}
        if (parcel_weight) {
          updParcelData.parcel_weight = parcel_weight
        }
        if (status) {
          updParcelData.status = status
        }
        if (estimated_delivery_days) {
          updParcelData.estimated_delivery_days = 
            estimated_delivery_days
          
        }
         console.log({updParcelData});
        dispatch(updateAParcel(updParcelData))
        navigate('/parcels')
      }
    } catch (error) {
      setErrorMessage('Parcel NOT FOUND.')
      console.log('errorMessage: ', errorMessage)
    }
  }


    return (
      <Container>
        <h3 className='text-center text-light'> Edit the parcel </h3>

        <Form onSubmit={submitHandler} className="updateParcel" data-testid="updateParcelTest" >
          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>Parcel no</InputGroup.Text>
            <Form.Control
              type='text'
              data-testid = 'parcelNoInput'
              aria-describedby='basic-addon1'
              size='sm'
              name='parcel_no'
              value={parcel_no}
              onChange={event => setParcelNo(Number(event.target.value))}
            />
          </InputGroup>

          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>
              Parcel Weight(kg)
            </InputGroup.Text>
            <Form.Control
              type='text'
              data-testid = "weightInput"
              aria-describedby='basic-addon1'
              size='sm'
              name='parcel_weight'
              value={parcel_weight}
              onChange={event => setParcelW(Number(event.target.value))}
            />
          </InputGroup>

          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>Status</InputGroup.Text>
            <Form.Control
              type='text'
              data-testid="statusInput"
              aria-describedby='basic-addon1'
              size='sm'
              name='status'
              value={status}
              onChange={event => setStatus(event.target.value)}
            />
          </InputGroup>

          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>
              Estimated delivery (in days)
            </InputGroup.Text>
            <Form.Control
              type='text'
              data-testid="eddInput"
              aria-describedby='basic-addon1'
              size='sm'
              name='estimated_delivery_days'
              value={estimated_delivery_days}
              onChange={event => setEDD(Number(event.target.value))}
            />
          </InputGroup>

          <Button type='submit' data-testid="updateButton">Edit Parcel</Button>
          <p>{errorMessage}</p>
        </Form>
      </Container>
    )
  }


export default UpdateParcel
