const express = require("express");
const router = express.Router();



// GET "/profile"
router.get("/", (req, res, next) => {


  if (req.session.activeUser === undefined) {
    res.redirect("/auth/login");
  } else {
    next()
  }

    res.render("profile/perfil.hbs")
})


module.exports = router;