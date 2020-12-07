import { useApolloClient } from "@apollo/react-hooks";
import jwtDecode from "jwt-decode";
const { createContext, useReducer, useContext } = require("react");

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  console.log(decodedToken, "decoded");
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}
const AuhtContext = createContext({
  user: null,
  login: (data) => {},
  logout: (data) => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const client = useApolloClient();
  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
    client.cache.reset();
  }
  return (
    <AuhtContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

const useAuthContext = () => useContext(AuhtContext);
export { AuthProvider, useAuthContext };
