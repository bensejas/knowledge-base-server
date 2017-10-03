'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var TopicSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the topic'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    links: [
        {
            topicId: {
                type: ObjectId,
                required: 'Enter an topic id'
            },
            description: {
                type: String,
                required: 'Enter a link description'
            },
            name: {
                type: String,
                required: 'Enter a link name'
            }
        }
    ]
});

module.exports = mongoose.model('Topics', TopicSchema);