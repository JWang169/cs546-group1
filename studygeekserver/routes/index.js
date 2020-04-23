const tutorRoutes = require('./tutors');
const studentRoutes = require('./students');
const userRoutes = require('./users');

const constructorMethod = (app) => {
	app.use('/tutors', tutorRoutes);
	app.use('/students', studentRoutes);
	app.use('/', userRoutes);

	app.use('*', (req, res) => {
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;