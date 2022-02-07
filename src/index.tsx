import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { history } from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <ConnectedRouter history={history}>
               <App />
            </ConnectedRouter>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
);
reportWebVitals();
