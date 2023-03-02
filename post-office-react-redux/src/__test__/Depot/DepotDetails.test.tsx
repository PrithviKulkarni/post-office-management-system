import { render, cleanup } from '@testing-library/react';
import DepotDetails from '../../components/Depot/DepotDetails';
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';

afterEach(cleanup);
it("Depot's details render test", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <DepotDetails />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies depot's details has rendered", () => {
  render(
    <Provider store={store}>
      <DepotDetails />
    </Provider>
  );
  
  expect(screen.getByTestId("depotDetails")).toBeInTheDocument();
});