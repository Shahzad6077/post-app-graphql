import React, { useState } from "react";

const Login = () => {
  const [fieldsState, setFieldsState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChangeFields = (e) => {
    const { name, value } = e.currentTarget;
    setFieldsState((p) => ({ ...p, [name]: value }));
  };
  return (
    <div className="session">
      <h1>Login</h1>
      <form>
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
    </div>
  );
};

export default Login;
