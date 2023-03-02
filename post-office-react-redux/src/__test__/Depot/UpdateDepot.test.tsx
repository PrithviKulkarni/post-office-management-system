import { fireEvent, render, screen } from '@testing-library/react'
import { store } from '../../app/store'
import { Provider } from 'react-redux'
import UpdateDepot from '../../components/Depot/UpdateDepot'
import { BrowserRouter } from 'react-router-dom'

it('renders update depot correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UpdateDepot />
      </BrowserRouter>
    </Provider>
  )
  expect(asFragment()).toMatchSnapshot()
})

it('Verifies the update depot render', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UpdateDepot />
      </BrowserRouter>
    </Provider>
  )
  const button = getByTestId('button')
  expect(button.textContent).toBe('Update Depot Details')
  const city = getByTestId('cityIn')
  const workers = getByTestId('workersIn')
  fireEvent.change(city, { target: { value: 'test' } })
  fireEvent.change(workers, { target: { value: '27' } })
  fireEvent.click(button)
  expect(button).toBeTruthy()
  expect(screen.getByTestId('updateDepot')).toHaveClass('updateDepot')
})
