const jwt = require('jsonwebtoken');
require('dotenv').config();

const cheaklogin = async (req,res, next) => {
    try {
        const token = req.signedCookies.whyneedthename;
        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.userobj = decode;
            next();
        } else {
            res.redirect("/register");
        }
    } catch (error) {
        console.log(error)
        res.redirect("/register")
    }
    
}

const stoplogin = (req,res, next) => {
    try {
        const tokenn = req.signedCookies.whyneedthename;
        if (!tokenn) {
            next()
        } else {
            res.redirect("/")
        }
    } catch (error) {
    }
    
}

module.exports = {
    cheaklogin,
    stoplogin
};