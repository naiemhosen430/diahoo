const resmodel = require("../models/register")
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const postmodel = require("../models/post");
const likemodel = require("../models/like");
const likedmodel = require("../models/like");
const chatmodel = require("../models/chat");
const sendEmail = require("./utils/sendEmail");
require('dotenv').config()

const registercontrolerpost = async (req, res, next) => {
    try {
        const invalidUser = await resmodel.findOne({email: req.body.email});
        if (!invalidUser) {
            const haspasd = await bcrypt.hash(req.body.password, 10)
            const email = req.body.email
            const user = await new resmodel({
                fullname: req.body.fullname,
                email: email,
                password: haspasd
        
            })
            const userobjectt = {
                userid: user._id,
            }
            const token = jwt.sign(userobjectt, process.env.JWT_SECRET, {
                expiresIn: '10000h'
            })
            res.cookie(process.env.COOKI_NAME, token, {
                maxAge: 8640000000,
                httpOnly: true,
                signed: true,
            })
            await user.save()
            res.redirect('/editprofile')
        } else {
            const alredyachavemsg = "This inputed value already had used !!";
            const usrinputedemailorphone = req.body.email;
            const usrinputedemailorname = req.body.fullname;
            const usrinputedemailorpass = req.body.password;
            req.session.allinfo = {
                alredyachavemsg,
                usrinputedemailorphone,
                usrinputedemailorname,
                usrinputedemailorpass
            };
            res.redirect('/register')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/register')
    }

}


const loginpostcontroler = async (req,res) => {
    try {

        const validUser = await resmodel.findOne({ email: req.body.username });
        if (validUser) {
            const cheakpassword = await bcrypt.compare(req.body.password, validUser.password);
            if (cheakpassword == true) {
                const userobject = {
                    userid: validUser._id,
                }
                const token = jwt.sign(userobject, process.env.JWT_SECRET, {
                    expiresIn: '10000h'
                })
                res.cookie(process.env.COOKI_NAME, token, {
                    maxAge: 8640000000,
                    httpOnly: true,
                    signed: true,
                })
                req.session.userid = validUser._id;
                res.redirect('/')
            } else {
                const usrinputedemailorpassworlog = 'Password is not matching';
                const usrinputedemailornamelog = req.body.username;
                const usrinputedemailorpasslog = req.body.password;
                req.session.allinfooflog = {
                    usrinputedemailorpassworlog,
                    usrinputedemailornamelog,
                    usrinputedemailorpasslog
                };
                res.redirect('/login')
            }
        } else {
            const usrinputedemailorpassworlogname = 'input is not matching';
            const usrinputedemailornamelogname = req.body.username;
            const usrinputedemailorpasslogname = req.body.password;
            req.session.allinfooflogusername = {
                usrinputedemailorpassworlogname,
                usrinputedemailornamelogname,
                usrinputedemailorpasslogname
            };
            res.redirect('/login')
        }
    } catch (error) {
        console/log(error)
    }
}

const homecontroler = async (req,res) => {
    try {
        const token = req.signedCookies.whyneedthename;
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const myself = await resmodel.findOne({_id: decode.userid})
        const allpost = await postmodel.aggregate([{ $sample: { size: 20 } }]);
        const mypost = await postmodel.find({ postownerid: decode.userid})
        res.render('home', {myself, allpost, mypost})
    } catch (error) {
        
    }
}

const editprofilecontrolerr = async (req,res) => {
    try {
        const userIdforee = req.params.userIdforee
        const {name, about, age, hometwon, homecity, birthday, phone} = req.body
        await resmodel.updateOne({_id: userIdforee},{
            $set: {
                fullname: name,
                tittle: about || 'not set',
                hometwon : hometwon || 'not set',
                homecity : homecity || 'not set',
                birthday : birthday || 'not set',
                phone : phone || 'not set',
                age : age || 'not set'
                }
        })
        res.redirect('/')
    } catch (error) {
        
    }
}

const likecontroler = async (req,res) => {
    try {
        const newlike = {
            postid: req.body.postid,
            likeduserid: req.body.likeduserid,
            likedusername: req.body.likedusername,
            likeduserphoto: req.body.likeduserphoto,
        }
        await postmodel.updateOne({_id: req.body.postid},{
            $push : {
                like : newlike
            }
        })
        res.sendStatus(200);
    } catch (error) {
        
    }
}



const dislikecontroler = async (req,res) => {
    try {
        const likeduseridn = req.body.likeduseridn

        await postmodel.updateOne({_id: req.body.postidn},{
            $pull : {like : {likeduserid: likeduseridn}}}
        )
        res.sendStatus(200);
    } catch (error) {
        
    }
}


const commentcontroller = async (req,res) => {
    try {
        const newcomment = {
            postid: req.body.postidc,
            likeduserid: req.body.likeduseridc,
            likedusername: req.body.likedusernamec,
            likeduserphoto: req.body.likeduserphotoc,
            commenttexttext: req.body.commenttexttext
        }
        await postmodel.updateOne({_id: req.body.postidc},{
            $push : {
                comment : newcomment
            }
        })
    } catch (error) {
        
    }
}



const postcontroler = async (req,res) => {
    try {
        console.log(req.files.postimageor[0].filename || '')
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();
        const postdate = `${date} ${month} ${year}`
        const picture = req.files.postimageor[0].filename || ''
        const newpost = await postmodel({
            postcontent: req.body.postcontent,
            postownerid: req.body.postownerid,
            postownername: req.body.postownername,
            postownerpicture: req.body.postownerpicture,
            postedtime: postdate,
            picture
        })
        await newpost.save()
        res.redirect('/')
    } catch (error) {
        
    }
}


const postvideocontroler = async (req, res) => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const date = currentDate.getDate();
      const postdate = `${date} ${month} ${year}`;
      
      const url = req.body.video;
  
      const videoId = url.includes('youtu.be/')
        ? url.split('youtu.be/')[1]
        : url.split('v=')[1].split('&')[0];
  
      // Construct the embedded code
      const embedCode = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  
      const newpostvdo = await postmodel({
        postcontent: req.body.postcontent,
        postownerid: req.body.postownerid,
        postownername: req.body.postownername,
        postownerpicture: req.body.postownerpicture,
        postedtime: postdate,
        type: 'video',
        video: embedCode,
      });
  
      await newpostvdo.save();
      console.log(newpostvdo)
      res.redirect('/');
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ error: 'An error occurred while saving the post.' });
    }
  };



const addfriendcontroler = async (req,res) => {
    try {
        const myidd = req.params.myidd
            
        const addfriendidd = req.params.addfriendidd
        await resmodel.updateOne({_id: addfriendidd},{
            $push : {
                friendrequests : myidd
            }
        })
    } catch (error) {
        
    }
}

const cencelfriendrequestcontroler = async (req,res) => {
    try {
        const cenmyid = req.params.cenmyid
        const cenfriendid = req.params.cenfriendid
        
        
        await resmodel.updateOne({_id: cenfriendid},{
            $pull : {friendrequests : cenmyid}}
        )
            
    } catch (error) {
        
    }
}


const getsendrequserofmecontroler = async (req,res) => {
    try {
        const userIdsforsendreqofmeidss = req.query.userIds;
    if (userIdsforsendreqofmeidss) {
            const userIdsArray = userIdsforsendreqofmeidss.split(',');

        
        const userswhoreqme = await resmodel.find({ _id: { $in: userIdsArray } });
        
        // Convert the users to HTML elements
        const userElements = userswhoreqme.map(user => `
            <div style="background-color: rgb(51, 49, 49);" class="col-lg-5 hoverr rounded col-12 py-1 my-1 d-block">
                <div>
                    <div class="d-flex p-2">
                        <a href="/prof/${user._id}">
                            <div class="col-2 px-2">
                            <a href="/prof/${user._id}">
                                <img style="width: 60px; height: 60px; border-radius: 100px;" src="/assets/images/profilephoto/${user.profilephoto}" alt="">
                            </a>
                            </div>
                            <div class="col-6 ps-4">
                                <a href="/profile/${user._id}">
                                    <h3 class="col-12">${user.fullname}</h3>
                                </a>
                                <h6 class="col-12 text-info">${user.homecity}</h6>
                            </div>
                            <div class="col-4">
                                <button class="d-block bg-success text-light text-bolder py-1 px-4 rounded" onclick="confirmreqandsendids('${user._id}')">Confirm</button>
                                <button class="d-block bg-secondary text-light text-bolder py-1 px-4 rounded" onclick="deletereqandsendids('${user._id}')">Remove</button>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `);
        
        // Return the user elements as the response
        res.send(userElements.join(''));
    } else {
    }
    } catch (error) {
        console.error('Error occurred while converting user IDs to ObjectIDs:', error);
    }
}

const getmyallfriendofmecontroler = async (req,res) => {
    try {
        const myallfriendsofmeidss = req.query.friendsIds;
    if (myallfriendsofmeidss) {
            const userIdsArrayy = myallfriendsofmeidss.split(',');

        
        const userswhoreqmee = await resmodel.find({ _id: { $in: userIdsArrayy } });
        
        // Convert the users to HTML elements
        const userElementss = userswhoreqmee.map(user => `
            <div style="background-color: rgb(51, 49, 49);" class="col-lg-5 hoverr rounded col-12 py-1 my-1 d-block">
                <div>
                    <a href="/profile/${user._id}">
                        <div class="d-flex p-2">
                            <div class="col-2 px-2">
                                <img style="width: 60px; height: 60px; border-radius: 100px;" src="/assets/images/profilephoto/${user.profilephoto}" alt="">
                            </div>
                            <div class="col-10 ps-4">
                                <h3 class="col-12">${user.fullname}</h3>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `);
        
        // Return the user elements as the response
        res.send(userElementss.join(''));
    } else {
    }
    } catch (error) {
        console.error('Error occurred while converting user IDs to ObjectIDs:', error);
    }
}



const mychatlistControler = async (req, res) => {
    try {
      const myIdForChat = req.query.myIdForChat;
      const myChatlists = await chatmodel.find({
        chatIds: { $elemMatch: { $elemMatch: { $in: [myIdForChat] } } },
      });
  
      const userElements = [];
      for (const chatlist of myChatlists) {
        const friendId = chatlist.chatIds[0].find((id) => id !== myIdForChat);
        if (friendId) {
          const myfriend = await resmodel.findOne({ _id: friendId });
          const lastMessage = chatlist.messages[chatlist.messages.length - 1];
          const userElement = `
            <div style="background-color: rgb(51, 49, 49);" class="col-lg-8 hoverr rounded col-12 py-1 my-1 m-auto d-block">
              <div>
                <a class="textdnone" href="/chat/${myfriend._id}/${myIdForChat}">
                  <div class="d-flex p-2">
                    <div class="col-2 text-center">
                      <img style="width: 50px; height: 50px; border-radius: 100px;" class="mx-4 d-block" src="/assets/images/profilephoto/${myfriend.profilephoto}" alt="">
                    </div>
                    <div class="col-10">
                      <h3 class="col-12 ps-4 text-light">${myfriend.fullname}</h3>
                      <h6 class="col-12 ps-4">${lastMessage.mstContent}</h6>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          `;
          userElements.push(userElement);
        }
      }
  
      const myfriendElementsHTML = userElements.join('');
      res.send(myfriendElementsHTML);
    } catch (error) {
      console.error('Error retrieving chat data:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  



const confirmreqcontroler = async (req,res) => {
    try {
        const {myfriendidforconfirmreqq, myidforconfirmreq} = req.body
        await resmodel.updateOne({_id: myidforconfirmreq},{
            $push : {
                friends : myfriendidforconfirmreqq
            }
        })
        await resmodel.updateOne({_id: myfriendidforconfirmreqq},{
            $push : {
                friends : myidforconfirmreq
            }
        })
        await resmodel.updateOne({_id: myidforconfirmreq},{
            $pull : {
                friendrequests : myfriendidforconfirmreqq
            }
        })
    } catch (error) {
        
    }
}
const deletereqcontroler = async (req,res) => {
    try {
        const {myfriendidfordeletereqq, myidforconfirmreqqq} = req.body
        await resmodel.updateOne({_id: myidforconfirmreqqq},{
            $pull : {
                friendrequests : myfriendidfordeletereqq
            }
        })

    } catch (error) {

    }
}


const editcovercontroler = async (req,res) => {
    try {
        const coverphotoname = req.file.filename
        await resmodel.updateOne({_id: req.params.myidforeditcover},{
            $set: {
                coverphoto: [coverphotoname]
            }
        })
        res.redirect('/editprofile')
    } catch (error) {
        console.log(error)
    }
}

const editprofilepiccontroler = async (req,res) => {
    try {
        const profilephotoname = req.file.filename
        await resmodel.updateOne({_id: req.params.myidforeditprofile},{
            $set: {
                profilephoto: [profilephotoname]
            }
        })
        res.redirect('/editprofile')
    } catch (error) {
        console.log(error)
    }
}

const resetpasswordControlerPost = async (req,res) => {
    try {
        const existedUser = await resmodel.findOne({email:req.body.username})
        if (existedUser) {
            const randomNumber = Math.floor(Math.random() * 1000000000000000000000);
            const successfull= await sendEmail(req.body.username, existedUser._id, randomNumber)
            await resmodel.updateOne({email:req.body.username},{
                $set: {
                    verificationCode : randomNumber
                }
            })
            if (successfull.statusCode === 200) {
                req.session.reqresetuserid = existedUser._id
                req.session.successmessage = 'Password reset link has sent to your mail. Check and reset your password'
            } else {
                console.log('something wents wrong')
            }
        } else {
            req.session.failedmessage = 'User not found please create an account'
        }
        res.redirect('/resetpasswordpage')
    } catch (error) {
        console.log(error)
    }
}


const setnewpasswordControler = async (req,res) => {
    try {
        const newHasPassword = await bcrypt.hash(req.body.newpassword, 10)
        console.log(req.params.id)
        await resmodel.updateOne({_id: req.params.id},{
            $set: {
                password: newHasPassword,
                verificationCode: 1111
            }
        })
        req.session.resetsuccessfully = 'Password has changed'
        res.redirect('/login')
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getsendrequserofmecontroler,
    setnewpasswordControler,
    getmyallfriendofmecontroler,
    cencelfriendrequestcontroler,
    resetpasswordControlerPost,
    editprofilepiccontroler,
    registercontrolerpost,
    postvideocontroler,
    loginpostcontroler,
    editprofilecontrolerr,
    confirmreqcontroler,
    deletereqcontroler,
    homecontroler,
    postcontroler,
    likecontroler,
    editcovercontroler,
    dislikecontroler,
    commentcontroller,
    addfriendcontroler,
    mychatlistControler
}


