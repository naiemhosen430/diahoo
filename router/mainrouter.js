const express = require('express')
const { 
    logincontroler,
    registercontroler,
    editprofilecontroler,
    profilecontroler,
    singleChatControler,
    exploremorecontroler,
    resetpasswordControler,
    setNewpasswordpageControler,
} = require('../controlers/maincontroler')
const { cheaklogin, stoplogin } = require('../controlers/midlewayer/jwtvalidation')
const { homecontroler, getsendrequserofmecontroler, getmyallfriendofmecontroler, mychatlistControler, } = require('../controlers/postroutecontroler')
const mynoteControler = require('../controlers/axios.get')
const mainrouter = express.Router()

require('dotenv').config()

mainrouter.get('/', cheaklogin, homecontroler)
mainrouter.get('/login', stoplogin, logincontroler)
mainrouter.get('/resetpasswordpage', stoplogin, resetpasswordControler)
mainrouter.get('/register', stoplogin, registercontroler)
mainrouter.get('/editprofile/', cheaklogin, editprofilecontroler)
mainrouter.get('/profile/:suid', cheaklogin, profilecontroler)
mainrouter.get('/singlechat', cheaklogin, singleChatControler)
mainrouter.get('/explormore/:myidforren', cheaklogin, exploremorecontroler)


// password reset
mainrouter.get('/setNewpasswordpage/:userid/:key', setNewpasswordpageControler)


//extra routes
mainrouter.get('/getsendrequserofme', cheaklogin, getsendrequserofmecontroler)
mainrouter.get('/getmyallfriends', cheaklogin, getmyallfriendofmecontroler)
mainrouter.get('/mychatlist', cheaklogin, mychatlistControler)



//logout
mainrouter.get('/logout', (req, res) => {
    res.clearCookie(process.env.COOKI_NAME)
    res.redirect('/login');
});



// extra feature
mainrouter.get('/mynote', mynoteControler)




//over write page


module.exports=mainrouter