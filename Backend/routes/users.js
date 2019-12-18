var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')
const bodyParser = require('body-parser')
var utility = require('../utility/utility')

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/laybaikiemtra', (req, res, next) => {
  let getExamQuery = "SELECT * FROM BaiKiemTra"
  pool.query(getExamQuery, (err, result) => {
    if (err) throw err
      res.send(JSON.stringify(result))
  })
})

router.get('/thongtinbaikiemtra/:examID', (req, res, next) => {
  let getExamQuery = "SELECT * FROM BaiKiemTra WHERE MaBaiKiemTra = " + req.params.examID

  pool.query(getExamQuery, (err, result) => {
    if (err) throw err
      res.send(JSON.stringify(result))
  })
})

router.post('/batdaulambai', (req, res, next) => {
  let data = req.body
  let time = new Date(data.startTime)
  console.log(time);
  res.send('ok');
})

router.put('/nopbai/', (req, res, next) => {
  let data = req.body
  console.log(data) 
})



router.get('/thongtincanhan/:userID', (req, res, next) => {
  let userID = req.params.userID
  let getUserInfoQuery = "SELECT * FROM NguoiDung WHERE MaNguoiDung = " + userID
  pool.query(getUserInfoQuery, (error, result) => {
    if (error) throw error
    res.send(JSON.stringify(result))
  })
})

router.post('/thembaikiemtra', (req, res, next) => {
  const requestBody = req.body;
  const getLastExamID = "SELECT MaBaiKiemTra FROM BaiKiemTra WHERE MaBaiKiemTra=(SELECT MAX(MaBaiKiemTra) FROM BaiKiemTra)";
  pool.query(getLastExamID, (err, result) => {
    if (err) throw err;
    var newExamID = 0
    if (result.length !== 0)
      newExamID = JSON.parse(JSON.stringify(result))[0].MaBaiKiemTra + 1;
    let insertExamQuery =   `
                    INSERT INTO BaiKiemTra (TenBaiKiemTra, MaHocKy, Lop, ThoiGian, TuaDe, NoiDungBaiDoc, TenTacGia, GhiChu)
                    VALUES  
                    (N'${requestBody.examName}', '${requestBody.semester}', '${requestBody.grade}', '${requestBody.duration}',
                     N'${requestBody.title}', N'${requestBody.content}', N'${requestBody.author}', N'${requestBody.note}') 
                  `;

    pool.query(insertExamQuery, (err2, result2) => {
      if (err2) throw err2  
      
      var insertQuestionQuery = "INSERT INTO CauHoi (SoThuTu, MaBaiKiemTra, NoiDung) VALUES ?"
      var questionValues = utility.getQuestionValues(requestBody.questionList, newExamID)

      pool.query(insertQuestionQuery, [questionValues], (e3, r) => {
        if (e3) throw e3
        
        var insertChoicesQuery = "INSERT INTO LuaChon (SoThuTu, STTCauHoi, MaBaiKiemTra, NoiDung, Dung) VALUES ?"
        var choiceValues = utility.getChoiceValues(requestBody.choiceList, newExamID)

        pool.query(insertChoicesQuery, [choiceValues], (e4, r4) => {
          if (e4) throw(e4)
          return res.json({
            success: true
          })
        })
      })
    })
  });
})

router.get('/laynguoidung', (req, res, next) => {
  let query = "SELECT * FROM NguoiDung ORDER BY DiemTichLuy DESC"
  pool.query(query, function (err, result) {
    if (err) throw err;
      res.send(JSON.stringify(result))
  });
})

module.exports = router;