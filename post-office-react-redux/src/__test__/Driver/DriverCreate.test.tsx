import { render, cleanup, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';
import { BrowserRouter } from "react-router-dom";
import CreateDriver from '../../components/Driver/CreateDriver'

afterEach(cleanup);

// CREATE DRIVERS COMPONENT

it('Renders Creat Drivers Page Correctly', () => {
     const { asFragment } = render(
          <Provider store={store}>
               <BrowserRouter>
                    <CreateDriver />
               </BrowserRouter>
          </Provider>
     );
     expect(asFragment()).toMatchSnapshot();
});

it('Should Verify Create Driver Render', () => {
     const { getByTestId } = render(
          <Provider store={store}>
               <BrowserRouter>
                    <CreateDriver />
               </BrowserRouter>
          </Provider>
     );
     const button = getByTestId("driver-create-button");
     expect(button.textContent).toBe("Submit");
     fireEvent.click(button);
     expect(button).toBeTruthy();

     const firstName = getByTestId("firstNameVal");
     expect(firstName.textContent).toBe("Please fill in field");
     const lastName = getByTestId("lastNameVal");
     expect(lastName.textContent).toBe("Please fill in field");
     const username = getByTestId("usernameVal");
     expect(username.textContent).toBe("Please fill in field");
     const email = getByTestId("emailVal");
     expect(email.textContent).toBe("Please fill in field");
     const password = getByTestId("passwordVal");
     expect(password.textContent).toBe("Please fill in field");
     expect(screen.getByTestId("create-driver-test")).toHaveClass("create-driver");

});

it('Should Verify Create Driver Render When Fields Are Filled', () => {
     const { getByTestId } = render(
          <Provider store={store}>
               <BrowserRouter>
                    <CreateDriver />
               </BrowserRouter>
          </Provider>
     );
     const button = getByTestId("driver-create-button");
     expect(button.textContent).toBe("Submit");
     const firstName = getByTestId("create-driver-fname");
     fireEvent.change(firstName, { target: { value: "Zainab" } });
     const lastName = getByTestId("create-driver-lname");
     fireEvent.change(lastName, { target: { value: "Bikar" } });
     const username = getByTestId("create-driver-username");
     fireEvent.change(username, { target: { value: "Zainab2022" } });
     const email = getByTestId("create-driver-email");
     fireEvent.change(email, { target: { value: "Zainab@gmail.com" } });
     const password = getByTestId("create-driver-password");
     fireEvent.change(password, { target: { value: "dfnrirje" } });
     fireEvent.click(button);
     expect(screen.getByTestId("create-driver-test")).toHaveClass("create-driver");
});
