import React from "react";
import App from "./App";
// import { AuthProvider } from "./Context/AuthContext";
import { AuthProvider } from "./Context/auth";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const httpLink = createHttpLink({
  uri: "http://localhost:5001",
});

const client = new ApolloClient({
  link: httpLink,
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
