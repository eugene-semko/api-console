import React, { useEffect } from "react";
import "./style/index.css";
import { Authorization } from "./components/Authorization";
import "./App.css";
import { Route } from "react-router-dom";
import { routes } from "./routes";
import { useSelector } from "react-redux";
import { authSliceSelectors } from "./store/authSlice";
import { history } from "./store";
import { Preloader } from "./components/ui/Preloader";
import { processLoading } from "./store/loadingSlice";
import { sagaActions } from "./sagas/actions";
import { Console } from "./components/Console";

function App() {
   const goodResponse = useSelector(authSliceSelectors.goodResponse);
   useEffect(() => {
      if (!goodResponse?.session) {
         history.push(routes.auth);
      }
   }, [goodResponse]);

   const isAutoAuthLoading = useSelector(
      processLoading.get(sagaActions.auth.autoAuth.type)
   );
   if (isAutoAuthLoading) return <Preloader />;
   return (
      <div className='App'>
         <Route path={routes.auth}>
            <Authorization />
         </Route>
         <Route path={routes.console}>
            <Console />
         </Route>
      </div>
   );
}

export default App;
