var express = require('express');
var mysql = require('mysql')
var router = express.Router();
var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DB
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/laybaikiemtra', (req, res, next) => {
  connection.query("SELECT * FROM BaiKiemTra", function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result))
    
  });
})
module.exports = router;
