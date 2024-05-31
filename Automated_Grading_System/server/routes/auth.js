const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// @des     Google Authentication
// @route   GET /auth/google

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "email",
      "profile",
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/drive"
    ],
    accessType: "offline",
    prompt: "consent",
  })
);

// @des     Google Auth Callback
// @route   GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET_KEY);
    res.redirect(`http://localhost:3000/redirect?token=${token}`);
  }
);

// @des     Logout of account
// @route   GET /auth/logout

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Logout failed");
    }

    res.redirect(`${process.env.CLIENT_SIDE_URL}/login`);
  });
});

module.exports = router;
