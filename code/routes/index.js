const tutorRoutes = require('./tutors');
const chatRoutes = require('./chat');

const handler = app => {
    app.use('/tutors', tutorRoutes);
    app.use('/chat', chatRoutes);

    app.use('/signup', (req, res) => {
        res.render("studygeeks/signup", {});
    });

    app.use('/login', (req, res) => {
        res.render("studygeeks/login", {});
    });
    app.use('/logout', (req, res) => {
        res.render("studygeeks/logout", {});
    });

    app.use('/chat', (req, res) => {
        res.render("studygeeks/chatpage", {});
    });

    app.use('*', (req, res) => {
        res.render("studygeeks/homepage", {});
    });
};
  
module.exports = handler; 