import { render, cleanup, fireEvent } from '@testing-library/react';
import CreateDepot from '../../components/Depot/CreateDepot';
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);
it("Depot create page render test", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
      <CreateDepot /></BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies depot create has rendered", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
      <CreateDepot />
      </BrowserRouter>
    </Provider>
  );
  const button = getByTestId("button");
  expect(button.textContent).toBe("Create Depot");
  const city = getByTestId("cityIn");
  const workers = getByTestId("workersIn");
  fireEvent.change(city, { target: { value: "test" } });
  fireEvent.change(workers, { target: { value: "27" } });
  fireEvent.click(button);
  expect(button).toBeTruthy();
  expect(screen.getByTestId("createDepot")).toHaveClass("createDepot");
});

