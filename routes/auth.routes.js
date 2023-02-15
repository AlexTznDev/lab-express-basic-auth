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

// GET "auth/login" => autentificar usuario
router.get("/login", (req, res, next) => {
  res.render("auth/login-form.hbs")
})

// POST "auth/login" => recibir la data de autentificacion
router.post("/login", async (req, res, next) => {

  console.log(req.body)
  const { username, password } = req.body;

  if(username === "" || password === "") {
    res.status(401).render("auth/login-form.hbs", {
      errorMessage: "Todos los campos deben de estar completados."
    })
    return;
  }

  try {
    const foundUser = await User.findOne({username: username})
    if(foundUser === null) {
      res.status(401).render("auth/login-form.hbs", {
        errorMessage: "Este usuario no existe"
      })
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if(isPasswordCorrect === false){
      res.render("auth/login-form.hbs", {
        errorMessage: "La contraseña es incorrecta"
      })
      return;
    }

    req.session.activeUser = foundUser
    req.session.save(() => {
      res.redirect("/profile")
    })


  } catch (error) {
    next(error)
  }


  
})

module.exports = router;