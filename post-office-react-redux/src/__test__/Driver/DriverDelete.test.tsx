import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';
import { BrowserRouter } from "react-router-dom";
import DeleteDriver from '../../components/Driver/DeleteDriver'

afterEach(cleanup);

// DELETE DRIVERS COMPONENT

it('Renders Delete Drivers Page Correctly', () => {
     const { asFragment } = render(
          <Provider store={store}>
               <BrowserRouter>
                    <DeleteDriver />
               </BrowserRouter>
          </Provider>
     );
     expect(asFragment()).toMatchSnapshot();
});

it('Should Have Div ID delete-driver', () => {
     render(
          <Provider store={store}>
               <BrowserRouter>
                    <DeleteDriver />
               </BrowserRouter>
          </Provider>
     );
     expect(screen.getByTestId("delete-driver-test")).toHaveClass("delete-driver");

});


