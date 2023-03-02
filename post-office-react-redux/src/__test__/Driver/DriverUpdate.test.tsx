import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event'
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';
import { BrowserRouter } from "react-router-dom";
import UpdateDriver from '../../components/Driver/UpdateDriver'

afterEach(cleanup);

describe('Update Form', () => {
     const onSubmit = jest.fn();

     beforeEach(() => {
          onSubmit.mockClear();
     });

     // UPDATE DRIVERS COMPONENT

     it('Renders update Drivers Page Correctly', () => {
          const { asFragment } = render(
               <Provider store={store}>
                    <BrowserRouter>
                         <UpdateDriver />
                    </BrowserRouter>
               </Provider>
          );
          expect(asFragment()).toMatchSnapshot();
     });

     it('Should Verify Update Driver Render Validation', () => {
          const { getByTestId } = render(
               <Provider store={store}>
                    <BrowserRouter>
                         <UpdateDriver />
                    </BrowserRouter>
               </Provider>
          );
          const button = getByTestId("driver-update-button");
          expect(button.textContent).toBe("Update Driver Details");
          fireEvent.click(button);
          expect(button).toBeTruthy();
     
          const firstName = getByTestId("firstNameVal");
          expect(firstName.textContent).toBe("Please fill in field");
          const lastName = getByTestId("lastNameVal");
          expect(lastName.textContent).toBe("Please fill in field");
          const email = getByTestId("emailVal");
          expect(email.textContent).toBe("Please fill in field");
          expect(screen.getByTestId("update-driver-test")).toHaveClass("update-driver");
     
     });
     
     it('Should Verify Update Driver Render When Fields Are Filled', () => {
          const { getByTestId } = render(
               <Provider store={store}>
                    <BrowserRouter>
                         <UpdateDriver />
                    </BrowserRouter>
               </Provider>
          );
          const button = getByTestId("driver-update-button");
          expect(button.textContent).toBe("Update Driver Details");
          const firstName = getByTestId("update-driver-fname");
          fireEvent.change(firstName, { target: { value: "Zainab" } });
          const lastName = getByTestId("update-driver-lname");
          fireEvent.change(lastName, { target: { value: "Bikar" } });
          const email = getByTestId("update-driver-email");
          fireEvent.change(email, { target: { value: "Zainab@gmail.com" } });
          fireEvent.click(button);
          expect(screen.getByTestId("update-driver-test")).toHaveClass("update-driver");
     });
})