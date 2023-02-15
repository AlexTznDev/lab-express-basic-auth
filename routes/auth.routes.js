const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

// GET "/auth/signup"
router.get("/signup", (req, res, next) => {
  res.render("auth/signup-form.hbs");
});

//POST "/auth/signup"
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.status(401).render("auth/signup-form.hbs", {
      errorMessage: "Todos los campos deben estar llenos",
    });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (passwordRegex.test(password) === false) {
    res.render("auth/signup-form.hbs", {
      errorMessage:
        "La contrasena debe tener minimum 8 caractere 1 majuscula , un caractere especial",
    });
    return;
  }
  try {

    const foundUser = await User.findOne({ username: username });
    if(foundUser !== null){
        res.render("auth/signup-form.hbs",{
            errorMessage: "ya existe este Username"
        })
        return
    }

  //encryptar al password
  const salt = await bcrypt.genSalt(12)
  const hashPassword = await bcrypt.hash(password, salt)


    const response = await User.create({
      username: username,
      password: hashPassword,
    });

    res.redirect("/auth/signup");
  } catch (error) {
    next(error);
  }


});

module.exports = router;
