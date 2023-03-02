import React, { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { defaultParcel, Parcel } from '../interfaces/parcelInterface'
import { Container, Button, Form, InputGroup } from 'react-bootstrap'
import { addNewParcel } from '../../features/ParcelSlice'

/***
 * @returns A form to fill by the user to create a new Letter
 */
const CreateParcel = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [parcel_no, setParcelNo] = useState<number>(0)
  const [parcel_weight, setParcelW] = useState<number>(0)
  const [status, setStatus] = useState<string>('')
  const [estimated_delivery_days, setEDD] = useState<number>(0)

  const [errorMessage, setErrorMessage] = useState<string>('')

  const submitHandler = (event: SyntheticEvent) => {
    console.log('inside SUbmit Handler')
    event.preventDefault()
    

    const validated = [
      parcel_no,
      parcel_weight,
      status,
      estimated_delivery_days
    ].every(Boolean)


    try {
      if (validated) {
        const newParcelData: Parcel = defaultParcel

        if (parcel_no) {
          newParcelData.parcel_no = parcel_no
        }
        if (parcel_weight) {
          newParcelData.parcel_weight = parcel_weight
        }
        if (status) {
          newParcelData.status = status
        }
        if (estimated_delivery_days) {
          newParcelData.estimated_delivery_days = estimated_delivery_days
        }

        dispatch(addNewParcel(newParcelData))
        navigate('/parcels')
       
      }
    } catch (error) {
      setErrorMessage('Parcel NOT FOUND.')
      console.log('errorMessage: ', errorMessage)
    }
  }

  return (
    <div className="createParcel" data-testid="createParcelTest" >
    <Container>
      <h3 className='text-center text-light'> Add a new parcel </h3>

      <Form onSubmit={submitHandler}>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='basic-addon1'>Parcel no</InputGroup.Text>
          <Form.Control
            data-testid="parcelNo-input"
            type='text'
            aria-label='parcel_no'
            aria-describedby='basic-addon1'
            size='sm'
            name='parcel_no'
            value={parcel_no}
            onChange={event => setParcelNo(Number(event.target.value))}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text id='basic-addon1'>Parcel Weight(kg)</InputGroup.Text>
          <Form.Control
            type='text'
            data-testid= "parcelWeight-input"
            aria-label='parcel_weight'
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
            data-testid="status-input"
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
            Estimated delivery (in days){' '}
          </InputGroup.Text>
          <Form.Control
            type='text'
            data-testid="edd-input"
            aria-label='estimated_delivery_days'
            aria-describedby='basic-addon1'
            size='sm'
            name='estimated_delivery_days'
            value={estimated_delivery_days}
            onChange={event => setEDD(Number(event.target.value))}
          />
        </InputGroup>

        <Button  type='submit' className="createButton" data-testid="createButton">Add New Parcel</Button>
        <p>{errorMessage}</p>
      </Form>
    </Container>
    </div>
  )
}

export default CreateParcel
