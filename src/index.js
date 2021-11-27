import React from "react";
import ReactDOM from "react-dom";
import ImageContainer from "./components/image-container";
import "./style.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";


ReactDOM.render(
  <Provider store={store}>
    <ImageContainer />
  </Provider>,
  document.getElementById("root")
);
