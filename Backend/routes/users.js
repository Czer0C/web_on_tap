var express = require('express');
var mysql = require('mysql')
var router = express.Router();


const bodyParser = require('body-parser');

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

router.get('/layhocky', (req, res, next) => {
  connection.query("SELECT * FROM HocKy", function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result))
    
  });
})

router.post('/thembaikiemtra', (req, res, next) => {
  
  const item = req.body

  const query =   `
                    INSERT INTO BaiKiemTra (TenBaiKiemTra, MaHocKy, Lop, ThoiGian, TuaDe, NoiDungBaiDoc, TenTacGia, GhiChu)
                    VALUES  
                    (N'${item.examName}', '${item.semester}', '${item.grade}', '${item.duration}',
                     N'${item.title}', N'${item.content}', N'${item.author}', N'${item.note}') 
                  `

  connection.query(query, function (err, result) {
    if (err) throw err;

    return res.json({
      success: true
    })
  });

  
})
module.exports = router;
