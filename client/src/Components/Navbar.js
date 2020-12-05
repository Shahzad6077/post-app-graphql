import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../Context/auth";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  if (user) {
    return (
      <nav style={{ justifyContent: "space-around" }}>
        <NavLink exact to="/">
          Posts
        </NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink exact to="/logout" onClick={logout}>
          Logout
        </NavLink>
      </nav>
    );
  }
  return (
    <nav>
      <NavLink exact to="/register">
        Register
      </NavLink>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/">
        Posts
      </NavLink>
    </nav>
  );
};

export default Navbar;
