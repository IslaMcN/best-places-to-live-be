const router = require("express").Router();
const passport = require("passport");

//check if a user is in request sent
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send(false);
  } else {
    next();
  }
};

//send a request to google to have or see if user is logged in
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  }),
  (req, res) => {
    res.send("login");
  }
);
router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  }),
  (req, res) => {
    res.send("login");
  }
);

//clear all sessions of cookies etc
router.get("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  res.send("you have logged out");
});

//Redirect url for user
router.get("/redirect/google", passport.authenticate("google"), (req, res) => {
  console.log(req.cookies["letsmovehomie"]);
  res.cookie("letsmovehomie", req.cookies["letsmovehomie"], {
    domain: "letsmovehomie.com"
  });
  res.cookie("letsmovehomie.sig", req.cookies["letsmovehomie.sig"], {
    domain: "letsmovehomie.com"
  });
  res.status(303).redirect("https://stagefe.letsmovehomie.com/topten");
});
//Redirect url for user
router.get(
  "/redirect/facebook",
  passport.authenticate("facebook"),
  (req, res) => {
    console.log(req.cookies["letsmovehomie"]);
    res.cookie("letsmovehomie", req.cookies["letsmovehomie"], {
      domain: "letsmovehomie.com"
    });
    res.cookie("letsmovehomie.sig", req.cookies["letsmovehomie.sig"], {
      domain: "letsmovehomie.com"
    });
    //res.status(303).redirect("https://stagefe.letsmovehomie.com/topten");
    console.log(req.cookies);
    res.status(302).redirect("http://localhost:3001/auth/validation");
  }
);

//Check for authentication
router.get("/validation", authCheck, (req, res) => {
  res.send(true);
});

module.exports = router;
