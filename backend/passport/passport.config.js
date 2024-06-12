import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.models.js";
import { GraphQLLocalStrategy } from "graphql-passport";

// configuration passport settings
export const configurePassport = async () => {
  // serialization user
  passport.serializeUser((user, done) => {
    console.log("Serialized user");
    done(null, user.id);
  });

  // deserialization user
  passport.deserializeUser(async (id, done) => {
    console.log("Deserialized user");

    try {
      const user = await User.findById(id);

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // passport middleware for login user
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error("Invalid username or password");
        }

        // check valid password
        const validPassword = await bcrypt.compareSync(password, user.password);

        if (!validPassword) {
          throw new Error("Invalid username or password");
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
