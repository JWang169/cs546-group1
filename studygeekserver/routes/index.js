const tutorRoutes = require('./tutors');
const studentRoutes = require('./students');

const constructorMethod = (app) => {
	app.use('/tutors', tutorRoutes);
	app.use('/students', studentRoutes);

	app.use('*', (req, res) => {
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;