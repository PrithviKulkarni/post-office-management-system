import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import DeleteParcel from '../../components/Parcel/DeleteParcel';


afterEach(cleanup);
it("renders Delete Parcel page correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <DeleteParcel />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Delete Parcel render", () => {
  const {getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <DeleteParcel />
      </BrowserRouter>
    </Provider>
  );


  const button = getByTestId('parcelButton')
  expect(button.textContent).toBe('Delete Parcel Details');
  fireEvent.click(button)
  expect(button).toBeTruthy()
  expect(screen.getByTestId("deleteParcel")).toBeInTheDocument()
});
