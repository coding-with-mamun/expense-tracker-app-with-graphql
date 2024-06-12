import User from "../../models/user.models.js";
import bcrypt from "bcryptjs";

// user resolver
const userResolver = {
  Mutation: {
    // create new user
    signup: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields must be valid");
        }

        // check username exists or not
        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("User already exists");
        }

        // password hash
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // create profile avatar using api
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // create new user
        const newUser = await User.create({
          username,
          name,
          password: passwordHash,
          gender,
          profilePicture: gender == "male" ? boyProfilePic : girlProfilePic,
        });

        await context.login(newUser);
        return newUser;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },

    // login user
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },

    // logout user
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          throw new Error(err.message || "Internal server error");
        });

        context.res.clearCookie("connect.sid");

        // response
        return { message: "Logged out successfully" };
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },
  },

  Query: {
    // authentication user
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },

    // single user
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },

    //? TODO => ADD USER transaction RELATION
  },
};

// export default
export default userResolver;
