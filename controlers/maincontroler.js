const chatmodel = require("../models/chat");
const postmodel = require("../models/post")
const resmodel = require("../models/register")
const jwt = require('jsonwebtoken');
require('dotenv').config()

const logincontroler = async (req,res) => {
    const allinfooflog = req.session.allinfooflog || "";
    const allinfooflogusername = req.session.allinfooflogusername || "";
    const messageofsuc = req.session.resetsuccessfully || ''
    delete req.session.resetsuccessfully;
    delete req.session.allinfooflog;
    delete req.session.allinfooflogusername;
    res.render('login', {allinfooflog, allinfooflogusername, messageofsuc})
}
const registercontroler = async (req,res) => {
    const allinfo = req.session.allinfo || "";
    delete req.session.allinfo;
    res.render('register', { allinfo });  
}
const editprofilecontroler = async (req,res) => {
    try {
        const token = req.signedCookies.whyneedthename;
        const decodee = jwt.verify(token, process.env.JWT_SECRET);
        const userforedit = await resmodel.findOne({_id: decodee.userid})
        res.render('editprofile', {userforedit})
    } catch (error) {
        
    }
}

const profilecontroler = async (req,res) => {
    try {
        const token = req.signedCookies.whyneedthename;
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const myself = await resmodel.findOne({_id: decode.userid})
        const selecteduser = await resmodel.findOne({_id : req.params.suid})
        const hispost = await postmodel.find({postownerid : req.params.suid})
        res.render('profile', {selecteduser, hispost, myself})
    } catch (error) {
        
    }
}

const singleChatControler = async (req, res) => {
    try {
      const chatInfo = req.session.chatInfo || req.session.chatInfoe || '';
      const messageInfo = chatInfo.validateForExisting || chatInfo.validateForExistingChat;
      const idsInfo = chatInfo.idsObject || chatInfo.idsObject;
      
      if (!chatInfo) {
        res.redirect('/#chat');
      } else {
        const mySelf = await resmodel.findOne({ _id: idsInfo.friendidforchat });
        const myFriend = await resmodel.findOne({ _id: idsInfo.myidforchat });

        delete req.session.chatInfo;
        delete req.session.chatInfoe;
        res.render('singlechat', { mySelf, myFriend, messageInfo,});
      }
    } catch (error) {
      // Handle errors
    }
};

const exploremorecontroler = async (req, res) => {
  try {
    const myid = req.params.myidforren;

    const activeUsers = await resmodel.aggregate([
      { $match: { online_status: 1 } },
      { $sample: { size: 100 } }, 
    ]);

    res.render('exploremore', { activeUsers, myid });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};


const resetpasswordControler = (req,res) => {
  try {
    const reqresetuserid = req.session.reqresetuserid || ''
    const messsage = req.session.successmessage || req.session.failedmessage || ''
    delete req.session.successmessage
    delete req.session.failedmessage
    res.render('resetpassword', {messsage, reqresetuserid})
  } catch (error) {
    console.log(error)
  }
}

const setNewpasswordpageControler = async (req,res) => {
  try {
    const reqresetuseid = req.params.userid || ''
    const reqresetusekey = req.params.key || ''
    const myselfresetpasss = await resmodel.findOne({_id: reqresetuseid})
    const verificationCode = myselfresetpasss.verificationCode || ''
    res.render('setNewpasswordpage', {reqresetuseid, reqresetusekey, verificationCode})
  } catch (error) {
    console.log(error)
  }
}


module.exports={
    logincontroler,
    setNewpasswordpageControler,
    resetpasswordControler,
    registercontroler,
    editprofilecontroler,
    profilecontroler,
    singleChatControler,
    exploremorecontroler
}