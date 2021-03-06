module.exports = function(app, passport) {
  // 45fcbdadb23165467e01c1d5940fcb6c

//   var DiffBot = require("diffbot-node-client");
//   var client = new DiffBot("45fcbdadb23165467e01c1d5940fcb6c");

//   app.get("/test", (req, res, next) => {
//     client.product.get(
//       {
//         url: "https://www.amazon.com/"
//       },
//       function onSuccess(response) {
//         console.log("Success", response);
//         res.json(JSON.parse(response));
//       },
//       function onError(response) {
//         console.log("Error", response);
//         res.json(response);
//       }
//     );
//   });



  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function(req, res) {
    res.render("login.hbs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/products", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function(req, res) {
    res.render("signup.hbs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/products", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["public_profile", "email"] })
  );

  // handle the callback after facebook has authenticated the user
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get(
    "/auth/twitter",
    passport.authenticate("twitter", { scope: "email" })
  );

  // handle the callback after twitter has authenticated the user
  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // google ---------------------------------

  // send to google to do the authentication
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // the callback after google has authenticated the user
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // =============================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  // =============================================================================

  // locally --------------------------------
  app.get("/connect/local", function(req, res) {
    res.render("connect-local.hbs", { message: req.flash("loginMessage") });
  });
  app.post(
    "/connect/local",
    passport.authenticate("local-signup", {
      successRedirect: "/products", // redirect to the secure profile section
      failureRedirect: "/connect/local", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get(
    "/connect/facebook",
    passport.authorize("facebook", { scope: ["public_profile", "email"] })
  );

  // handle the callback after facebook has authorized the user
  app.get(
    "/connect/facebook/callback",
    passport.authorize("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get(
    "/connect/twitter",
    passport.authorize("twitter", { scope: "email" })
  );

  // handle the callback after twitter has authorized the user
  app.get(
    "/connect/twitter/callback",
    passport.authorize("twitter", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // google ---------------------------------

  // send to google to do the authentication
  app.get(
    "/connect/google",
    passport.authorize("google", { scope: ["profile", "email"] })
  );

  // the callback after google has authorized the user
  app.get(
    "/connect/google/callback",
    passport.authorize("google", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect("/products");
    });
  });

  // facebook -------------------------------
  app.get("/unlink/facebook", isLoggedIn, function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect("/profile");
    });
  });

  // twitter --------------------------------
  app.get("/unlink/twitter", isLoggedIn, function(req, res) {
    var user = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect("/profile");
    });
  });

  // google ---------------------------------
  app.get("/unlink/google", isLoggedIn, function(req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
