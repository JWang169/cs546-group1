const express = require('express');
const app = express();
const cors = require('cors');
const configRoutes = require('./routes');
const session = require('express-session')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
	session({
		name: 'JunzheSession',
		secret: "Expelliarmus",
        saveUninitialized: true,
        resave: false 
	})
)



configRoutes(app);

app.listen(3003, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3003');
});