const Meet = require('../models/meets.model.js');

// Create and Save a new Meet
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Meet content can not be empty"
        });
    }

    // Create a Meet
    const meet = new Meet({
        title: req.body.title || "Untitled Meet", 
        content: req.body.content,
        room: req.body.room,
        start: req.body.start,
        end: req.body.end,
        host: req.body.host
    });

    // Save Meet in the database
    meet.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Meet."
        });
    });
};

// Retrieve and return all meets from the database.
exports.findAll = (req, res) => {
    Meet.find()
    .then(meets => {
        res.send(meets);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving meets."
        });
    });
};

// Find a single meet with a meetId
exports.findOne = (req, res) => {
    Meet.findById(req.params.meetId)
    .then(meet => {
        if(!meet) {
            return res.status(404).send({
                message: "Meet not found with id " + req.params.meetId
            });            
        }
        res.send(meet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Meet not found with id " + req.params.meetId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving meet with id " + req.params.meetId
        });
    });
};

// Update a meet identified by the meetId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Meet content can not be empty"
        });
    }

    // Find meet and update it with the request body
    Meet.findByIdAndUpdate(req.params.meetId, {
        title: req.body.title || "Untitled Meet",
        content: req.body.content,
        room: req.body.room,
        start: req.body.start,
        end: req.body.end,
        host: req.body.host
    }, {new: true})
    .then(meet => {
        if(!meet) {
            return res.status(404).send({
                message: "Meet not found with id " + req.params.meetId
            });
        }
        res.send(meet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Meet not found with id " + req.params.meetId
            });                
        }
        return res.status(500).send({
            message: "Error updating meet with id " + req.params.meetId
        });
    });
};

// Delete a meet with the specified meetId in the request
exports.delete = (req, res) => {
    Meet.findByIdAndRemove(req.params.meetId)
    .then(meet => {
        if(!meet) {
            return res.status(404).send({
                message: "Meet not found with id " + req.params.meetId
            });
        }
        res.send({message: "Meet deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Meet not found with id " + req.params.meetId
            });                
        }
        return res.status(500).send({
            message: "Could not delete meet with id " + req.params.meetId
        });
    });
};