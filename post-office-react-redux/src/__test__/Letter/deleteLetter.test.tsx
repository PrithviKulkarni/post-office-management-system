import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import DeleteLetter from "../../components/Letter/DeleteLetter";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
it("renders Delete Letter page correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <DeleteLetter />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Delete Letter render", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DeleteLetter />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByTestId("deleteLetter")).toHaveClass("deleteLetter");
});
