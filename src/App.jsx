import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import IndexRouter from "./routers/IndexRouter";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <IndexRouter></IndexRouter>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
