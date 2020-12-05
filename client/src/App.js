import { Fragment, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// PAGES
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import { useAuthContext } from "./Context/auth";

function App(props) {
  const { user } = useAuthContext();
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [user]);

  console.log(props);
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>GraphQl App</h1>
      <Navbar />
      <Switch>
        {user ? (
          <Fragment>
            <Route exact path="/">
              <Home />
            </Route>
          </Fragment>
        ) : (
          <Fragment>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Fragment>
        )}
      </Switch>
    </div>
  );
}

export default App;
