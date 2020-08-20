const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");
const User = require("./../../models/User");
const { SECRET_KEY } = require("./../../config");
const {
  userLoginFields,
  userRegisterFields
} = require("./../../Utils/Validators");

const generateToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );
};

module.exports = {
  Mutation: {
    //LOGIN MUTATION
    login: async (parent, args, context, info) => {
      try {
        const { username, password } = args;
        // # VALIDATE INPUT FIELDS.
        const { errors, valid } = userLoginFields(username, password);

        if (!valid) {
          throw new UserInputError("Fields Not be Empty", errors);
        }

        const user = await User.findOne({ username });

        if (!user) {
          errors.general = "User not found.";
          throw new UserInputError("User not found.", { errors });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          errors.general = "Wrong Credentials.";
          throw new UserInputError("Wrong Credentials.", { errors });
        }

        const token = generateToken(user);
        return {
          ...user._doc,
          id: user._id,
          token
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    // REGISTER MUTATION
    register: async (
      parent,
      { registerInput: { email, username, password, confirmPassword } },
      context,
      info
    ) => {
      try {
        // # Validate user Data
        const { errors, valid } = userRegisterFields(
          email,
          username,
          password,
          confirmPassword
        );
        if (!valid) {
          throw new UserInputError("Please Enter valid data", { errors });
        }
        // # Make sure user doesnt already exist

        const user = await User.findOne({ email, username });

        if (user) {
          throw new UserInputError("Please Choose another email.", {
            validationErrors: { email: "Please choose Another email." }
          });
        }

        // # Hash password and create an auth token

        password = await bcrypt.hash(password, 12);

        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString()
        });

        const saveRes = await newUser.save();

        const token = generateToken(saveRes);

        return {
          ...saveRes._doc,
          id: saveRes._id,
          token
        };
      } catch (err) {
        // console.log(err);
        throw new Error(err);
      }
    }
  }
};
