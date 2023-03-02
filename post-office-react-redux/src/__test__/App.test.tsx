import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";

it("Should render App component", () => {
   render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByTestId("test")).toHaveClass("App");
});
