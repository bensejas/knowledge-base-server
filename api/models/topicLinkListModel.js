'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var TopicLinkSchema = new Schema({
    topicOneId: {
        type: ObjectId,
        required: 'Enter a topic id for topic one'
    },
    topicTwoId: {
        type: ObjectId,
        required: 'Enter a topic id for topic two'
    },
    relationshipDescription: {
        type: String,
        required: 'Enter relationship description'
    }
});

module.exports = mongoose.model('TopicLinks', TopicLinkSchema);