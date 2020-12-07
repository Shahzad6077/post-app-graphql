const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./../config");

const authMiddleware = (context, isOptional = false) => {
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
        if (isOptional) {
          return null;
        } else {
          throw new AuthenticationError("Invalid/Expired Token.");
        }
      }
    }
    if (isOptional) {
      return null;
    } else {
      throw new Error("Authentication token must be 'Bearer [token]'");
    }
  }
  if (isOptional) {
    return null;
  } else {
    throw new Error("Authorization Header must be included.");
  }
};

module.exports = authMiddleware;
