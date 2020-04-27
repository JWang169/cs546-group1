const tutorRoutes = require('./tutors');

const handler = app => {
    app.use('/tutors', tutorRoutes);

    app.use('*', (req, res) => {
        res.render("studygeeks/homepage", {});
    });
};
  
module.exports = handler;