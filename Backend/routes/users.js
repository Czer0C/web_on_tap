var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')
// const bodyParser = require('body-parser')
var utility = require('../utility/utility')

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/dangnhap', (req, res, next) => {
  let item = req.body
  let loginQuery = `SELECT * FROM NguoiDung WHERE TenDangNhap = '${item.username}' AND MatKhau = '${item.password}'`
  pool.query(loginQuery, (error, result) => {
    if (error) throw error
    let response = {
      success: false
    }
    if (result.length !== 0) {
      let temp = JSON.parse(JSON.stringify(result))[0]
      response.success = true
      response.token = "666"
      response.userID = temp.MaNguoiDung
      response.userGrade = temp.Lop
    }
    res.send(JSON.stringify(response))
  })
})

router.post('/dangxuat', (req, res, next) => {
  let item = req.body
  let logoutQuery = "TBA"
  res.send(JSON.stringify({
    success: true
  }))
})

router.get('/laybaikiemtra', (req, res, next) => {
  console.log(req.rawHeaders[5])
  if (req.rawHeaders[5].search("Bearer") !== -1) {
    // queryCheckToken
    let getExamQuery = "SELECT * FROM BaiKiemTra"
    pool.query(getExamQuery, (err, result) => {
      if (err) throw err
        res.send(JSON.stringify(result))
    })
  }
  else {
    res.send("Try again, boi.")
  }
})

router.get('/thongtinbaikiemtra/:examID', (req, res, next) => {
  let examID = req.params.examID
  let getExamQuery = "SELECT * FROM BaiKiemTra WHERE MaBaiKiemTra = " + examID

  pool.query(getExamQuery, (err, result) => {
    if (err) throw err
      let examInfo = JSON.stringify(result)
      let getQuestionQuery = "SELECT * FROM CauHoi WHERE MaBaiKiemTra = " + examID

      pool.query(getQuestionQuery, (err2, result2) => {
        if (err2) throw err2
        let questionInfo = JSON.stringify(result2)
        let getChoiceQuery = "SELECT * FROM LuaChon WHERE MaBaiKiemTra = " + examID

        pool.query(getChoiceQuery, (err3, result3) => {
          if (err3) throw err3
          let choiceInfo = JSON.stringify(result3)

          res.send(JSON.stringify({
            examInfo: examInfo,
            questionInfo: questionInfo,
            choiceInfo: choiceInfo
          }))
        })
      })
  })
})

router.post('/batdaulambai', (req, res, next) => {
  let data = req.body
  let time = new Date(data.startTime)
  let sectionID = -1
  let getSectionIDQuery = "SELECT MaPhienLamBai FROM PhienLamBai WHERE MaPhienLamBai=(SELECT MAX(MaPhienLamBai) FROM PhienLamBai)"
  let insertSectionQuery =  `INSERT INTO PhienLamBai (MaNguoiDung, MaBaiKiemTra, ThoiGianBatDau, KetThuc)
                             VALUES ('${data.userID}', '${data.examID}', '${time.toISOString().replace('Z', '').replace('T', ' ')}', '0')
                            `


  pool.query(insertSectionQuery, (error, result) => {
    if (error) throw error

    if (result.affectedRows) {
      pool.query(getSectionIDQuery, (error, result) => {
        if (error) throw error

        
        sectionID = JSON.parse(JSON.stringify(result))[0].MaPhienLamBai + 1
        console.log(sectionID)
        res.send(JSON.stringify({
          success: true,
          sectionID: sectionID
        }))
      })
    }
    else {
      res.send(JSON.stringify({
        success: false
      }))
    }
  })
})

router.put('/nopbai/', (req, res, next) => {
  let data = req.body
  let time = new Date(data.endTime)
  let getScoreFactor = `SELECT GiaTri FROM ThamSo WHERE MaThamSo = '1'`
  pool.query(getScoreFactor, (error, result) => {
    if (error) throw error
    let scoreFactor = JSON.parse(JSON.stringify(result))[0].GiaTri
    let updateSectionQuery =  `UPDATE PhienLamBai 
                             SET ThoiGianKetThuc = '${time.toISOString().replace('Z', '').replace('T', ' ')}', DiemSo = '${data.mark * scoreFactor}', KetThuc = '1'
                             WHERE (MaPhienLamBai = '${data.sectionID}')
                            `
    pool.query(updateSectionQuery, (error, result) => {
      if (error) throw error
      console.log(updateSectionQuery)
      if (result.affectedRows) {
        res.send(JSON.stringify({
          success: true
        }))
      }
      else {
        res.send(JSON.stringify({
          success: false
        }))
      }
    })
  })
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