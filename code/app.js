const express = require("express");
const app = express();
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const configRoutes = require("./routes");
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});