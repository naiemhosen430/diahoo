const express = require('express')
const { 
  registercontrolerpost, 
  loginpostcontroler, 
  editprofilecontroler, 
  postcontroler, 
  likecontroler, 
  dislikecontroler, 
  commentcontroller, 
  addfriendcontroler, 
  cencelfriendrequestcontroler, 
  confirmreqcontroler, 
  deletereqcontroler, 
  editcovercontroler, 
  editprofilepiccontroler, 
  editprofilecontrolerr, 
  resetpasswordControlerPost, 
  setnewpasswordControler,
  postvideocontroler
} = require('../controlers/postroutecontroler')
const upload = require('../controlers/uploadcontroler/pandcupload')
const { uploadpostimage } = require('../controlers/uploadcontroler/postimageuploader')
const { cheaklogin } = require('../controlers/midlewayer/jwtvalidation')
const { chatcontroler, sendMessageControler } = require('../controlers/chatcontroler')
const addnoteControler = require('../controlers/note.controler')
const postroute = express.Router()


postroute.post('/registerpost', registercontrolerpost)
postroute.post('/resetpassword', resetpasswordControlerPost)
postroute.post('/setnewpassword/:id', setnewpasswordControler)
postroute.post('/loginpost', loginpostcontroler)
postroute.post('/like', cheaklogin, likecontroler)
postroute.post('/dislike', cheaklogin, dislikecontroler)
postroute.post('/comment', cheaklogin, commentcontroller)
postroute.post('/addfriend/:myidd/:addfriendidd', cheaklogin, addfriendcontroler)
postroute.post('/cencelfriendreq/:cenmyid/:cenfriendid', cheaklogin, cencelfriendrequestcontroler)
postroute.post('/post', cheaklogin, uploadpostimage.fields([
  { name: 'postimageor', maxCount: 10 }
]), postcontroler)
postroute.post('/postvideo', postvideocontroler)
postroute.post('/editcover/:myidforeditcover', cheaklogin, upload.single('coverphoto'), editcovercontroler)
postroute.post('/editprofile/:myidforeditprofile', cheaklogin, upload.single('profilebtnin'), editprofilepiccontroler)
postroute.post('/editprofiletext/:userIdforee', cheaklogin, editprofilecontrolerr)


//extra routes
postroute.post('/confirmfriendreq', cheaklogin, confirmreqcontroler)
postroute.post('/deletefriendreq', cheaklogin, deletereqcontroler)



// chat router
postroute.get('/chat/:myidforchat/:friendidforchat', cheaklogin, chatcontroler)



// extra feature 
postroute.post('/addnote', addnoteControler)

module.exports=postroute