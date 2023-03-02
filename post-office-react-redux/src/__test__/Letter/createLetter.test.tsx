import React, { useState } from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import CreateLetter from "../../components/Letter/CreateLetter";
import { BrowserRouter } from "react-router-dom";

 afterEach(cleanup);
it("renders Create Letter page correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <CreateLetter />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Create Letter render", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <CreateLetter />
      </BrowserRouter>
    </Provider>
  );
  const button = getByTestId("createButton");
  expect(button.textContent).toBe("Submit");
  fireEvent.click(button);
  expect(button).toBeTruthy();
  const address = getByTestId("validate-address");
  const delivery = getByTestId("validate-delivery");
  expect(address.textContent).toBe("Please fill in field");
  expect(delivery.textContent).toBe("Please fill in field");
  expect(screen.getByTestId("createLetter")).toHaveClass("createLetter");
});

it("Verifies the Filled Create Letter render", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <CreateLetter />
      </BrowserRouter>
    </Provider>
  );
  const button = getByTestId("createButton");
  expect(button.textContent).toBe("Submit");
  const address = getByTestId("address-input");
  const delivery = getByTestId("delivery-input");
  fireEvent.change(address, { target: { value: "test" } });
  fireEvent.change(delivery, { target: { value: "test" } });
  fireEvent.click(button);
  expect(screen.getByTestId("createLetter")).toHaveClass("createLetter");
});
