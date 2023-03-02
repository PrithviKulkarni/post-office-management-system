import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CreateParcel from '../../components/Parcel/CreateParcel';

afterEach(cleanup);
it("renders Create Parcel page correctly", () => {
    const{ asFragment } = render(
        <Provider store= {store}>
            <BrowserRouter>
            <CreateParcel/>
            </BrowserRouter>
        </Provider>
    )
    expect(asFragment()).toMatchSnapshot();
});

it("Verifies the Create Parcel render", () => {
   const{getByTestId} =  render(
        <Provider store= {store}>
            <BrowserRouter>
            <CreateParcel/>
            </BrowserRouter>
        </Provider>
    )
    const button = getByTestId("createButton");
    expect(button.textContent).toBe("Add New Parcel");
    
    
    const parcelNo = getByTestId("parcelNo-input")
    const parcelWeight = getByTestId("parcelWeight-input")
    const status = getByTestId("status-input")
    const edd = getByTestId("edd-input")
    fireEvent.change(parcelNo, {target: {value: "1"}});
    fireEvent.change(parcelWeight, {target: {value: "1"}})
    fireEvent.change(status, {target: {value: "test"}})
    fireEvent.change(edd, {target: {value: "1"}} )
    fireEvent.click(button);
    expect(button).toBeTruthy();
    expect(screen.getByTestId("createParcelTest")).toHaveClass("createParcel")
})






