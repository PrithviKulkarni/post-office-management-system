import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import UpdateParcel from "../../components/Parcel/UpdateParcel";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
it("renders Update Parcel page correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UpdateParcel />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Update Parcel render", () => {
  const{getByTestId} = render(
    <Provider store={store}>
      <BrowserRouter>
        <UpdateParcel />
      </BrowserRouter>
    </Provider>
  );


  const button = getByTestId("updateButton");
  expect(button.textContent).toBe("Edit Parcel");
  

  const parcelNo = getByTestId("parcelNoInput")
    const parcelWeight = getByTestId("weightInput")
    const status = getByTestId("statusInput")
    const edd = getByTestId("eddInput")
    fireEvent.change(parcelNo, {target: {value: "1"}});
    fireEvent.change(parcelWeight, {target: {value: "2"}})
    fireEvent.change(status, {target: {value: "test"}})
    fireEvent.change(edd, {target: {value: "3"}} )
    fireEvent.click(button);
    expect(button).toBeTruthy();
  
  expect(screen.getByTestId("updateParcelTest")).toHaveClass("updateParcel");
});
