'use strict';

var mongoose = require('mongoose'),
    Topic = mongoose.model('Topics');
var ObjectId = mongoose.Types.ObjectId;

exports.list_all_topics = function (req, res) {
    Topic.find({}, { name: 1, links: 1 }, function (err, topic) {
        if (err)
            res.send(err);
        res.json(topic);
    });
};

exports.create_a_topic = function (req, res) {
    var new_topic = new Topic(req.body);
    new_topic.save(function (err, topic) {
        if (err)
            res.send(err);
        res.json(topic);
    });
};

exports.read_a_topic = function (req, res) {
    Topic.findById(req.params.topicId, function (err, topic) {
        if (err)
            res.send(err);
        res.json(topic);
    });
};

exports.update_a_topic = function (req, res) {
    Topic.findOneAndUpdate({_id: req.params.topicId}, req.body, {new: true}, function (err, topic) {
        if (err)
            res.send(err);
        res.json(topic);
    });
};

exports.delete_a_topic = function (req, res) {
    Topic.remove({
        _id: req.params.topicId
    }, function (err, topic) {
        if (err)
            res.send(err);
        res.json({message: 'Topic successfully deleted'});
    });
};

exports.create_a_link_for_topic = function (req, res) {
    console.log('params topic Id:', req.params.topicId);
    console.log('body topic Id:', req.body.topicId);
    // Update existing link if it exists
    Topic.findOneAndUpdate({$and:[{"_id":ObjectId(req.params.topicId)},{"links.topicId":ObjectId(req.body.topicId)}]},
        {$set:{"links.$.description":req.body.description, "links.$.name":req.body.name}}, function (err, topic) {
            console.log('err:', err);
            console.log('topic:', topic);
            if (err)
                res.send(err);

            if (!topic) {
                // Create new link when it doesn't exist
                Topic.findOneAndUpdate({$and:[{"_id":ObjectId(req.params.topicId)}]},
                    {$addToSet:{"links":{$each:[{"topicId": ObjectId(req.body.topicId),"description":req.body.description,"links.$.name":req.body.name}]}}}, function(err, addedTopic) {
                        console.log('err2:', err);
                        console.log('topic2:', addedTopic);
                        if (err) {
                            res.send(err);
                        }
                        res.json(addedTopic);
                    })
            } else {
                res.json(topic);
            }
        });
};
