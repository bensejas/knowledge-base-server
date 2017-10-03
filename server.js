var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Topic = require('./api/models/topicListModel'), //created model loading here
    // TopicLinks = require('./api/models/topicLinkListModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/knowledgeBaseDB');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/topicListRoutes'); //importing route
routes(app); //register the route

// var topicLinkRoutes = require('./api/routes/topicLinkListRoutes'); //importing route
// topicLinkRoutes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);