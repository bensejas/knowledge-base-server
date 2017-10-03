'use strict';
module.exports = function(app) {
    var topicLinksController = require('../controllers/topicLinkListController');

    app.route('/topics/:topicId/links')
        .get(topicLinksController.list_all_topicLinks_for_topic)
        .post(topicLinksController.create_a_topicLink_for_topic);


    app.route('/topicLinks/:topicLinkId')
        .get(topicLinksController.read_a_topicLink)
        .put(topicLinksController.update_a_topicLink)
        .delete(topicLinksController.delete_a_topicLink);
};