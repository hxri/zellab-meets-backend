module.exports = (app) => {
    const meets = require('../controllers/meet.controller.js');

    // Create a new meet
    app.post('/meets', meets.create);

    // Retrieve all meets
    app.get('/meets', meets.findAll);

    // Retrieve a single meet with meetId
    app.get('/meets/:meetId', meets.findOne);

    // Update a meet with meetId
    app.put('/meets/:meetId', meets.update);

    // Delete a meet with meetId
    app.delete('/meets/:meetId', meets.delete);
}