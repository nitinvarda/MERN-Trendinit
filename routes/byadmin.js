var express = require('express');
var router = express.Router();
var artic = require('./Schema');


router.get("/:name", (req, res) => {
    artic.find({ by: req.params.name }, (err, file) => {
        if (err) return console.error(err);
        return res.json(file);
    })
})

module.exports = router;