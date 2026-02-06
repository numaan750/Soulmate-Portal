import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import loginSchema from "../models/login.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile received:", profile.displayName);

        let user = await loginSchema.findOne({ googleId: profile.id });

        if (user) {
          console.log("Existing Google user found");
          return done(null, user);
        }

        user = await loginSchema.findOne({ email: profile.emails[0].value });

        if (user) {
          console.log("Linking Google to existing email account");
          user.googleId = profile.id;
          user.provider = "google";
          user.profilePicture = profile.photos[0]?.value || null;
          await user.save();
          return done(null, user);
        }

        console.log("Creating new Google user");
        user = await loginSchema.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: "google",
          profilePicture: profile.photos[0]?.value || null,
        });

        done(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await loginSchema.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
