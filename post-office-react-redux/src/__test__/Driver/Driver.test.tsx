import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../app/store';
import Drivers from '../../components/Driver/Drivers';

afterEach(cleanup);

// DRIVERS COMPONENT

it('Renders Drivers Page Correctly', () => {
     const { asFragment } = render(
          <Provider store={store}>
               <Drivers />
          </Provider>
     );
     expect(asFragment()).toMatchSnapshot();
});

it('Should Have Div ID drivers-page', () => {
     render(
          <Provider store={store}>
               <Drivers />
          </Provider>);
     expect(screen.getByTestId("drivers-page")).toBeInTheDocument();
})