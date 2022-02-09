import React, { useEffect } from "react";
import "./style/index.css";
import { Authorization } from "./components/Authorization";
import "./App.css";
import { Route } from "react-router-dom";
import { routes } from "./routes";
import { useSelector } from "react-redux";
import { authSliceSelectors } from "./store/authSlice";
import { history } from "./store";

function App() {
   const goodResponse = useSelector(authSliceSelectors.goodResponse);
   useEffect(() => {
      if (!goodResponse?.session) {
         history.push(routes.auth);
      }
   }, [goodResponse]);
   return (
      <div className='App'>
         <Route path={routes.auth}>
            <Authorization />
         </Route>
         <Route path={routes.console}>
            <div>2</div>
         </Route>
      </div>
   );
}

export default App;
