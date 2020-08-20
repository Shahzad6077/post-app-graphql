const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./../config");

const authMiddleware = context => {
  // In context we have req object from HTTP

  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer <token>

    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token.");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error("Authorization Header must be included.");
};

module.exports = authMiddleware;
