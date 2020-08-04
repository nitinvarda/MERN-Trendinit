var express = require('express');
var router = express.Router();
var artic = require("./Schema");


router.get("/", function (req, res, next) {
    if (req.isAuthenticated()) {
        return artic
            .find({})
            .limit(10)
            .sort({ _id: -1 })
            .exec((err, data) => {
                if (err) console.error(err);

                res.json(data);
            });

    }
    else {
        return res.send("unauthorized");
    }


})

module.exports = router;