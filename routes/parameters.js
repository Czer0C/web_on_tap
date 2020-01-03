var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')

var utility = require('../utility/utility')

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
  });

module.exports = router;