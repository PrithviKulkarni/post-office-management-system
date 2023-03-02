import { render, cleanup, fireEvent } from '@testing-library/react';
import DepotPage from '../../components/Depot/DepotPage';
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);
it("Depot speific page render test", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
      <DepotPage /></BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies depots has rendered", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
      <DepotPage /></BrowserRouter>
    </Provider>
  );
  const button = getByTestId('buttonO')
  expect(button.textContent).toBe('Return')
  fireEvent.click(button)
  expect(button).toBeTruthy()
  expect(screen.getByTestId("depotPage")).toBeInTheDocument();
});