const tutorRoutes = require('./tutors');

const handler = app => {
    app.use('/tutors', tutorRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(400);
    });
};
  
module.exports = handler;