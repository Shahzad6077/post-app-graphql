import React from "react";
import App from "./App";
// import { AuthProvider } from "./Context/AuthContext";
import { AuthProvider } from "./Context/auth";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const withToken = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5001",
});

const client = new ApolloClient({
  link: withToken.concat(httpLink),
  cache: new InMemoryCache(),
});

const Provider = () => (
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ApolloProvider>
);
export default Provider;
