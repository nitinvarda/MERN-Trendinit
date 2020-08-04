var express = require('express');
var router = express.Router();



router.get("/", (req, res) => {
    if (req.isAuthenticated()) {

        res.send("authenticated");
    }
    else {
        res.send("not authenticated");
    }
})

module.exports = router;