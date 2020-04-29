const tutorRoutes = require('./tutors');

const handler = app => {
    app.use('/tutors', tutorRoutes);


    app.use('/signup', (req, res) => {
        res.render("studygeeks/signup", {});
    });

    app.use('/login', (req, res) => {
        res.render("studygeeks/login", {});
    });
    app.use('/logout', (req, res) => {
        res.render("studygeeks/logout", {});
    });

    app.use('*', (req, res) => {
        res.render("studygeeks/homepage", {});
    });
};
  
module.exports = handler; 