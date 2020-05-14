const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const configRoutes = require('./routes');
const session = require('express-session');
const server = app.listen(3003, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3003');
});
const io = require('socket.io').listen(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(
	session({
		name: 'JunzheSession',
		secret: "Expelliarmus",
        saveUninitialized: true,
        resave: false 
	})
);

configRoutes(app);

// Used for receiving/processing chat.ejs emissions
io.sockets.on('connection', function(socket) {
    socket.on('connect', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 '  + socket.username + ' joined the chat. Happy learning!');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 ' + socket.username + ' left the chat.');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', ' ' + socket.username + ': ' + message);
    });

});