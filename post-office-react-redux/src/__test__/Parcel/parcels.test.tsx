import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import Parcels from "../../components/Parcel/Parcels";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
it("renders list Parcel page correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Parcels />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the List Parcel render", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Parcels />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByTestId("parcels")).toHaveClass("parcels");
});
