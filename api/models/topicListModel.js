'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
        type: String,
    }
});

module.exports = mongoose.model('Topics', TopicSchema);