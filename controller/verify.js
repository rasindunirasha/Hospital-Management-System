var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;

// POST route for verifying the token
router.post('/', function (req, res) {
    var id = req.body.id;
    var token = req.body.token;

    // Ensure `id` and `token` are provided
    if (!id || !token) {
        return res.status(400).send('ID and Token are required.');
    }

    db.matchtoken(id, token, function (err, result) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal server error.');
        }

        // Check if the result exists and has data
        if (!result || result.length === 0) {
            return res.status(404).send('Token did not match.');
        }

        var email = result[0].email; // Safely access the first result
        var email_status = "verified";

        // Update the email status in the database
        db.updateverify(email, email_status, function (err, updateResult) {
            if (err) {
                console.error('Database update error:', err);
                return res.status(500).send('Failed to update email status.');
            }

            res.send('Email verified successfully.');
        });
    });
});
