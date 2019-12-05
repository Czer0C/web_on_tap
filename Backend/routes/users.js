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
  
  const item = req.body;
  const getSemester = "select count(*) as 'tong' from BaiKiemTra";
  connection.query(getSemester, (err, result) => {
    if (err) throw err;
    var semesterID = JSON.parse(JSON.stringify(result))[0].tong + 1;

    const query =   `
                    INSERT INTO BaiKiemTra (TenBaiKiemTra, MaHocKy, Lop, ThoiGian, TuaDe, NoiDungBaiDoc, TenTacGia, GhiChu)
                    VALUES  
                    (N'${item.examName}', '${item.semester}', '${item.grade}', '${item.duration}',
                     N'${item.title}', N'${item.content}', N'${item.author}', N'${item.note}') 
                  `;
    connection.query(query, (err2, result2) => {
      if (err2) throw err2
      var value = []
      item.questionList.forEach(item => {
        var temp = []
        temp.push(item.ID)
        temp.push(semesterID)
        temp.push(item.content)
        value.push(temp)
      });
      var insertQuestion = 
      
      `            
        INSERT INTO CauHoi (SoThuTu, MaBaiKiemTra, NoiDung) VALUES ?  
      `
      connection.query(insertQuestion, [value], (e3, r) => {
        if (e3) throw e3
        
        var insertChoices = `INSERT INTO LuaChon (SoThuTu, MaCauHoi, MaBaiKiemTra, NoiDung, Dung) VALUES ?`
        var choiceValues = []
        console.log(item.choiceList)
        item.choiceList.forEach(item => {
          var temp = []
          temp.push(item.ID)
          temp.push(item.questionID)
          temp.push(semesterID)
          temp.push(item.content) 
          temp.push(item.isCorrect)
          choiceValues.push(temp)
        });

        connection.query(insertChoices, [choiceValues], (e4, r4) => {
          if (e4) throw(e4)
          return res.json({
            success: true
          })
        })
      })
    })
    
  });

  
})
module.exports = router;


