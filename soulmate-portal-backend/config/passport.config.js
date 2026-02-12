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
        console.log("🔍 Google Profile received:", profile.displayName);
        console.log("📧 Email:", profile.emails[0].value);
        console.log("🆔 Google ID:", profile.id);

        // 🟢 STEP 1: First check if user exists by googleId
        let user = await loginSchema.findOne({ googleId: profile.id });

        if (user) {
          console.log("✅ Existing Google user found - Logging in");
          return done(null, user);
        }

        // 🟢 STEP 2: Check if email already exists (to link accounts)
        user = await loginSchema.findOne({ email: profile.emails[0].value });

        if (user) {
          console.log("🔗 Linking Google to existing email account");
          
          // Update existing user with Google data
          user.googleId = profile.id;
          user.provider = "google";
          user.profilePicture = profile.photos[0]?.value || user.profilePicture;
          
          await user.save();
          console.log("✅ Account linked successfully");
          return done(null, user);
        }

        // 🟢 STEP 3: Create new user only if no existing user found
        console.log("➕ Creating new Google user");
        user = await loginSchema.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: "google",
          profilePicture: profile.photos[0]?.value || null,
          // Password is not required for Google users
        });

        console.log("✅ New Google user created:", user._id);
        done(null, user);
      } catch (error) {
        console.error("❌ Google Strategy Error:", error);
        console.error("Error details:", error.message);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("📝 Serializing user:", user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await loginSchema.findById(id);
    console.log("📖 Deserializing user:", user?._id);
    done(null, user);
  } catch (error) {
    console.error("❌ Deserialize error:", error);
    done(error, null);
  }
});

export default passport;