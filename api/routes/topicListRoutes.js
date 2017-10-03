'use strict';
module.exports = function(app) {
    var topicList = require('../controllers/topicListController');

    app.route('/topics')
        .get(topicList.list_all_topics)
        .post(topicList.create_a_topic);


    app.route('/topics/:topicId')
        .get(topicList.read_a_topic)
        .put(topicList.update_a_topic)
        .delete(topicList.delete_a_topic);

    app.route('/topics/:topicId/links')
        .post(topicList.create_a_link_for_topic);
};