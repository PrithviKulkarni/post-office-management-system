import React from "react";
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { store } from "../../app/store";
import { Provider } from "react-redux";
import EditLetter from "../../components/Letter/EditLetter";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
it("renders Edit Letter page correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <EditLetter />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Edit Letter render", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <EditLetter />
      </BrowserRouter>
    </Provider>
  );
  const button = getByTestId("editButton");
  expect(button.textContent).toBe("Submit");
  fireEvent.click(button);
  expect(button).toBeTruthy();
  const address = getByTestId("validate-address");
  const delivery = getByTestId("validate-delivery");
  expect(address.textContent).toBe("Please fill in field");
  expect(delivery.textContent).toBe("Please fill in field");
  expect(screen.getByTestId("editLetter")).toHaveClass("editLetter");
});

it("Verifies the Edit Create Letter render", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <EditLetter />
      </BrowserRouter>
    </Provider>
  );
  const button = getByTestId("editButton");
  expect(button.textContent).toBe("Submit");
  const address = getByTestId("address-input");
  const delivery = getByTestId("delivery-input");
  const delivered = getByTestId("delivered-input");
  fireEvent.change(address, { target: { value: "test" } });
  fireEvent.change(delivery, { target: { value: "test" } });
  fireEvent.change(delivered, { target: { value: "test" } });
  fireEvent.click(button);
  expect(screen.getByTestId("editLetter")).toHaveClass("editLetter");
});
