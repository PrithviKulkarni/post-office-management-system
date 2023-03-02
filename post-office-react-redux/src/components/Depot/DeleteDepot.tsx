import { useState, SyntheticEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Container, Button, Form } from 'react-bootstrap'

import { defaultDepot, Depot } from '../interfaces/depotinterface'

import { useAppDispatch } from '../../app/hooks'
import { deleteADepot } from '../../features/DepotSlice'

const DeleteDepot = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState<string>('')

  let { depId } = useParams()
  let depotId: string = '0'
  if (!depId) {
    depId = '0'
  }
  depotId = depId
  console.log({ depotId })

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()
    const validated = [depId].every(Boolean)
    try {
      if (validated) {
        const updDepotData: Depot = defaultDepot

        if (depId) {
          updDepotData.id = depId
        }

        console.log({ updDepotData })

        dispatch(deleteADepot(updDepotData))

        navigate('/depots')
        window.location.reload()
      }
    } catch (error) {
      setErrorMessage('Depot NOT FOUND.')
      console.log('errorMessage: ', errorMessage)
    }
  }

  return (
    <Container>
      <Form
        onSubmit={submitHandler}
        className='deleteDepot'
        data-testid='deleteDepot'
      >
        <Button type='submit' className='button' data-testid='button'>
          Delete Depot
        </Button>
      </Form>
    </Container>
  )
}

export default DeleteDepot
