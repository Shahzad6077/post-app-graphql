import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthContext } from "../Context/auth";

const Register = () => {
  const authContext = useAuthContext();
  const [errors, setErrors] = useState({});
  const [fieldsState, setFieldsState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      const { data } = result;
      authContext.login({ ...data.register, isAuthenticated: true });
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
      <h1>Register</h1>
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
          Email
          <input
            name="email"
            type="email"
            onChange={onChangeFields}
            value={fieldsState["email"]}
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
        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            onChange={onChangeFields}
            value={fieldsState["confirmPassword"]}
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
