import { render, cleanup } from '@testing-library/react';
import AllDepots from '../../components/Depot/Depots';
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';

afterEach(cleanup);
it("Depots render test", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <AllDepots />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies depots has rendered", () => {
  render(
    <Provider store={store}>
      <AllDepots />
    </Provider>
  );
  
  expect(screen.getByTestId("depotsPage")).toBeInTheDocument();
});