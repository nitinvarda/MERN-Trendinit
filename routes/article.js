var express = require('express');
var router = express.Router();
var artic = require("./Schema");

router.get('/:id', function (req, res, next) {
    artic.find({ _id: req.params.id }, function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    })
})

module.exports = router;