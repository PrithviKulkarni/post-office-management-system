import React, { useState, SyntheticEvent } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'

import { Container, Button, Form, InputGroup } from 'react-bootstrap'
import { Depot, defaultDepot } from '../interfaces/depotinterface'

import { addNewDepot } from '../../features/DepotSlice'

const CreateDepot = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [city, setCity] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [workers, setWorkers] = useState<number>(0)

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()

    const validated = [city, workers].every(Boolean)
    try {
      if (validated) {
        const newDepotData: Depot = defaultDepot

        if (city) {
          newDepotData.city = city
        }
        if (workers) {
          newDepotData.workers = Number(workers)
        }

        console.log({ newDepotData })

        dispatch(addNewDepot(newDepotData))
        navigate('/depots')
      }
    } catch (error) {
      setErrorMessage('Unable to create depot.')
      console.log('errorMessage: ', errorMessage)
    }
  }

  return (
    <div className="createDepot" data-testid='createDepot'>
      <Container>
        <Form onSubmit={submitHandler}>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>Depot City</InputGroup.Text>
            <Form.Control
              type='text'
              aria-describedby='basic-addon1'
              size='sm'
              data-testid="cityIn"
              value={city}
              onChange={event => setCity(event.target.value)}
            />
          </InputGroup>

          <InputGroup className='mb-3'>
            <InputGroup.Text id='basic-addon1'>
              Number of workers
            </InputGroup.Text>
            <Form.Control
              type='text'
              aria-describedby='basic-addon1'
              size='sm'
              data-testid="workersIn"
              value={workers}
              onChange={event => setWorkers(Number(event.target.value))}
            />
          </InputGroup>

          <Button type='submit' className="button" data-testid="button">Create Depot</Button>
          <p>{errorMessage}</p>
        </Form>
      </Container>
    </div>
  )
}

export default CreateDepot
