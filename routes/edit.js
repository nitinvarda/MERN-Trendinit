var express = require('express');
var router = express.Router();
var artic = require('./Schema');
var mark = require('marked');

/* GET home page. */
router.get("/:id", function (req, res, next) {
    if (req.isAuthenticated()) {
        artic.findOne({ _id: req.params.id }, function (err, data) {
            if (err) return console.error(err);

            res.json(data);
        })

    }
    else {
        res.send("authentication failed");

    }
});



module.exports = router;
