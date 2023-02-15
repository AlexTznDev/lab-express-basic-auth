const express = require("express");
const router = express.Router();
//LLamado de los middlewares para las autenticaciones. 
const { isLoggedIn, isMainUser, isPrivateUser } = require("../middlewares/auth-middlewares.js")

// GET "/profile"
router.get("/", isLoggedIn, (req, res, next) => {
    res.render("profile/perfil.hbs")
})

//GET "/profile/main" => Ruta para miembros main.
router.get("/main",isLoggedIn, isMainUser, (req, res, next) => {
    res.render("profile/main.hbs")
})

router.get("/private",isLoggedIn, isPrivateUser, (req, res, next) => {
    res.render("profile/private")
})
module.exports = router;