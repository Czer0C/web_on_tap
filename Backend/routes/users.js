var express = require('express');
var router = express.Router();
var pool = require('../Middleware/database')

const bodyParser = require('body-parser');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/laybaikiemtra', (req, res, next) => {
  pool.query("SELECT * FROM BaiKiemTra", function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result))
    
  });
})

router.get('/layhocky', (req, res, next) => {
  pool.query("SELECT * FROM HocKy", function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result))
    
  });
})

router.post('/thembaikiemtra', (req, res, next) => {
  
  const item = req.body;
  const getSemester = "SELECT MaBaiKiemTra FROM BaiKiemTra WHERE MaBaiKiemTra=(SELECT MAX(MaBaiKiemTra) FROM BaiKiemTra)";
  //console.log(item.questionList)
  pool.query(getSemester, (err, result) => {
    if (err) throw err;
    var semesterID = JSON.parse(JSON.stringify(result))[0].MaBaiKiemTra  + 1;

    const query =   `
                    INSERT INTO BaiKiemTra (TenBaiKiemTra, MaHocKy, Lop, ThoiGian, TuaDe, NoiDungBaiDoc, TenTacGia, GhiChu)
                    VALUES  
                    (N'${item.examName}', '${item.semester}', '${item.grade}', '${item.duration}',
                     N'${item.title}', N'${item.content}', N'${item.author}', N'${item.note}') 
                  `;
    pool.query(query, (err2, result2) => {
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
      pool.query(insertQuestion, [value], (e3, r) => {
        if (e3) throw e3
        
        var insertChoices = `INSERT INTO LuaChon (SoThuTu, STTCauHoi, MaBaiKiemTra, NoiDung, Dung) VALUES ?`
        var choiceValues = []
        //console.log(item.choiceList)
        item.choiceList.forEach(item => {
          var temp = []
          temp.push(item.ID)
          temp.push(item.questionID)
          temp.push(semesterID)
          temp.push(item.content) 
          temp.push(item.isCorrect)
          choiceValues.push(temp)
        });

        pool.query(insertChoices, [choiceValues], (e4, r4) => {
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


