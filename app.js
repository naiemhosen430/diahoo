const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mainrouter = require('./router/mainrouter');
const postroute = require('./router/postroute');
const chatmodel = require('./models/chat');
const resmodel = require('./models/register');
const { Console } = require('console');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(session({
  secret: process.env.sesionsicret,
  resave: false,
  saveUninitialized: true
}));

app.use(cookieParser(process.env.COOKIS_KEY));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(postroute);
app.use(mainrouter);

app.set('view engine', 'ejs');

const url = process.env.MONGIDB_URL || 'mongodb+srv://diahoonaiem:NaiemDia001@cluster0.h90pqgn.mongodb.net/diahoo?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, options)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  });

io.on('connection', (socket) => {
let myidd;


  const updateOnlineStatus = async (onlineStatus) => {
    if (myidd) {
      try {
        await resmodel.updateOne({ _id: myidd }, { $set: { online_status: onlineStatus } });
      } catch (error) {
        console.log(error);
      }
    }
  };


  socket.on('myId', async (myId) => {
    myidd = myId;
    try {
      await updateOnlineStatus(1);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('messagesend', (messageObject) => {
    const { messageID, myidForChat, mstContent } = messageObject;

    chatmodel.updateOne({ _id: messageID }, { $push: { messages: { ownerId: myidForChat, mstContent } } })
      .then(() => {
        const message = { ownerId: myidForChat, mstContent };
        io.emit('message', message); // Broadcast the new message to all connected clients
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      });
  });

  socket.on('userIds', (ourIds) => {
    const { msgid } = ourIds;
    chatmodel.findOne({ _id: msgid })
      .then((ourChatDynamic) => {
        if (ourChatDynamic) {
          socket.emit('message', ourChatDynamic); // Send the chat data to the requesting client
        }
      })
      .catch((error) => {
        console.error('Error retrieving chat data:', error);
      });
  });

  socket.on('disconnect', async () => {
    try {
      await updateOnlineStatus(0);
    } catch (error) {
      console.log(error);
    }
  });


});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
