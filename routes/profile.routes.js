const express = require("express");
const router = express.Router();



// GET "/profile"
router.get("/", (req, res, next) => {
    res.render("profile/perfil.hbs")
})
module.exports = router;