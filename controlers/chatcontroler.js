const chatmodel = require("../models/chat");

const chatcontroler = async (req, res) => {
  try {
    const { myidforchat, friendidforchat } = req.params;
    const idsObject = {
      myidforchat,
      friendidforchat
    };

    const validateForExistingChat = await chatmodel.findOne({
      $or: [
        {
          chatIds: {
            $all: [[myidforchat, friendidforchat]]
          }
        },
        {
          chatIds: {
            $all: [[friendidforchat, myidforchat]]
          }
        }
      ]
    }).exec();

    if (!validateForExistingChat) {
      const newchat = new chatmodel();
      await newchat.save();
      await chatmodel.updateOne({ _id: newchat._id }, {
        $push: {
          chatIds: [
            myidforchat,
            friendidforchat
          ]
        }
      }).exec();
      const validateForExisting = await chatmodel.findOne({ _id: newchat._id }).exec();
      req.session.chatInfo = { validateForExisting, idsObject };
      res.redirect('/singlechat');
    } else {
      req.session.chatInfoe = { validateForExistingChat, idsObject };
      res.redirect('/singlechat');
    }
  } catch (error) {
    // Handle errors
  }
};

// const sendMessageControler = (io) => {
//   io.on('connect', (socket) => {
//     console.log('hello');
//     try {
//       socket.on('messagesend', async (messageObject) => {
//         const messageObjectt = {
//           ownerId: messageObject.myidForChat,
//           mstContent: messageObject.mstContent
//         };

//         await chatmodel.updateOne({ _id: messageObject.messageID }, {
//           $push: {
//             messages: messageObjectt
//           }
//         }).exec();
//       });

//       socket.on('userIds', async (ourIds) => {
//         try {
//           const ourChatDynamic = await chatmodel.findOne({ _id: ourIds.msgid }).exec();
//           if (ourChatDynamic) {
//             socket.emit('message', ourChatDynamic);
//           }
//         } catch (error) {
//           console.error('Error retrieving chat data:', error);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };

module.exports = {
  chatcontroler,
};
