import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useAuthContext } from "./../Context/auth";

const Login = () => {
  const authContext = useAuthContext();
  const [errors, setErrors] = useState({});
  const [fieldsState, setFieldsState] = useState({
    username: "",
    password: "",
  });

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      const { data } = result;
      console.log(data);
      authContext.login({ ...data?.login, isAuhtenticated: true });
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception?.errors);
      setErrors(err.graphQLErrors[0].extensions.exception?.errors);
    },
    variables: fieldsState,
  });

  const onChangeFields = ({ currentTarget: { name, value } }) => {
    setFieldsState((p) => ({ ...p, [name]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addUser();
  };
  return (
    <div className="session">
      <h1>Login</h1>
      <form onSubmit={submitHandler} noValidate>
        <label>
          Username
          <input
            name="username"
            type="text"
            onChange={onChangeFields}
            value={fieldsState["username"]}
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={onChangeFields}
            value={fieldsState["password"]}
          />
        </label>
        <button>submit</button>
      </form>
      <ul>
        {Object.keys(errors).length > 0 &&
          Object.values(errors).map((v) => <li key={v}>{v}</li>)}
      </ul>
    </div>
  );
};

// WRITE GRAPH QL QUERIES.

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
