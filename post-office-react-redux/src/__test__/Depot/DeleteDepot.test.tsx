import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import DeleteDepot from "../../components/Depot/DeleteDepot";
import { BrowserRouter } from "react-router-dom";

// afterEach(cleanup);
it("renders Delete depot correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <DeleteDepot />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Delete depot render", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <DeleteDepot />
      </BrowserRouter>
    </Provider>
  );

  const button = getByTestId('button')
  expect(button.textContent).toBe('Delete Depot')
  fireEvent.click(button)
  expect(button).toBeTruthy()
  expect(screen.getByTestId("deleteDepot")).toHaveClass("deleteDepot");
});