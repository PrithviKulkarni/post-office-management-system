import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import Letters from "../../components/Letter/Letters";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
it("renders Letters page correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Letters />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Letters render", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Letters />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByTestId("letterList")).toBeInTheDocument();
});

