//Autenticacion para saber si el usuario esta con sesion iniciada.
const isLoggedIn = (req, res, next) => {
    if(req.session.activeUser === undefined){
        res.redirect("/auth/login")
    } else {
        next()
    }
}
//Autenticacion para saber si el usuario es de Rol "main" => "/main"
const isMainUser = (req, res, next) => {
    if(req.session.activeUser.role !== "main"){
        res.redirect("/auth/login")
    } else {
        next()
    }
}

//Autenticacion para saber si el usuario es de rol "admin" => "/private"
const isPrivateUser = (req, res, next) => {
    if(req.session.activeUser.role !== "admin") {
        res.redirect("/auth/login")
    } else {
        next()
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    isMainUser: isMainUser,
    isPrivateUser: isPrivateUser
}