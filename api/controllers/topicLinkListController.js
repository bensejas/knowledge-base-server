'use strict';

var mongoose = require('mongoose'),
    TopicLink = mongoose.model('TopicLinks');
const Topic = mongoose.model('Topics');
var ObjectId = require('mongoose').Types.ObjectId;

exports.list_all_topicLinks = function (req, res) {
    TopicLink.find({}, function (err, topicLinks) {
        if (err)
            res.send(err);
        res.json(topicLinks);
    });
};

exports.create_a_topicLink = function (req, res) {
    if (req && req.body && req.body.topicOneId === req.body.topicTwoId) {
        res.status(400).send({errorMessage: 'Topic one and two ids must be different.'})
    } else {
        var new_topicLink = new TopicLink(req.body);
        new_topicLink.save(function (err, topicLink) {
            if (err)
                res.send(err);
            res.json(topicLink);
        });
    }
};

exports.create_a_topicLink_for_topic = function (req, res) {
    // search for topic with matching id and link topic
    // Update that
    // db.getCollection('topics').findOneAndUpdate({$and:[{"_id":ObjectId("59d0a86ac57bc8646c8ff37f")},{"links.topicId":ObjectId("59d0a81cc57bc8646c8ff37c")}]},
    //     {$set:{"links.$.description":"Username is on Login page"}})
    console.log('params topic Id:', req.params.topicId);
    console.log('body topic Id:', req.body.topicId);
    Topic.findOneAndUpdate({$and:[{"_id":ObjectId(req.params.topicId)},{"links.topicId":ObjectId(req.body.topicId)}]},
        {$set:{"links.$.description":req.body.description, "links.$.name":req.body.name}}, function (err, topic) {
            console.log('err:', err);
            console.log('topic:', topic);
            if (err)
                res.send(err);
            if (!topic) {
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

    // IF return null then
    // search for topic with matching id
    // Insert link

    // db.getCollection('topics').findOneAndUpdate({$and:[{"_id":ObjectId("59d0a86ac57bc8646c8ff37f")}]},
    //     {$addToSet:{"links":{$each:[{"topicId": ObjectId("59d0a81cc57bc8646c8ff37c"),"description":"Username appears on login sdfdf"}]}}})


    // if (req && req.body && req.params.topicId === req.body.linkedTopicId) {
    //     res.status(400).send({errorMessage: 'Topic one and two ids must be different.'})
    // } else {
    //     const topicLink = {
    //         topicOneId: req.params.topicId,
    //         topicTwoId: req.body.linkedTopicId,
    //         relationshipDescription: req.body.relationshipDescription
    //     };
    //     var new_topicLink = new TopicLink(topicLink);
    //     new_topicLink.save(function (err, topicLink) {
    //         if (err)
    //             res.send(err);
    //         res.json(topicLink);
    //     });
    // }
};

exports.list_all_topicLinks_for_topic = function (req, res) {
    var objId = new ObjectId(req.params.topicId);
    TopicLink.find({ $or:[ {'topicOneId':objId}, {'topicTwoId':objId}]}, function (err, topicLinks) {
        if (err)
            res.send(err);
        res.json(topicLinks);
    });
};

exports.read_a_topicLink = function (req, res) {
    TopicLink.findById(req.params.topicLinkId, function (err, topicLink) {
        if (err)
            res.send(err);
        res.json(topicLink);
    });
};

exports.update_a_topicLink = function (req, res) {
    TopicLink.findOneAndUpdate({_id: req.params.topicLinkId}, req.body, {new: true}, function (err, topicLink) {
        if (err)
            res.send(err);
        res.json(topicLink);
    });
};

exports.delete_a_topicLink = function (req, res) {
    TopicLink.remove({
        _id: req.params.topicLinkId
    }, function (err, topicLink) {
        if (err)
            res.send(err);
        res.json({message: 'TopicLink successfully deleted'});
    });
};
