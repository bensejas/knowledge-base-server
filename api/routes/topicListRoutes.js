'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/topicListController');

    // todoList Routes
    app.route('/topics')
        .get(todoList.list_all_topics)
        .post(todoList.create_a_topic);


    app.route('/topics/:topicId')
        .get(todoList.read_a_topic)
        .put(todoList.update_a_topic)
        .delete(todoList.delete_a_topic);
};