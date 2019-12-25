var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')

var checkAuth =  require('../utility/checkAuth')

router.get('/', (req, res, next) => {
  let verified = checkAuth.verify(req)

  if (verified === true) {
    res.send("Users")
  }
  else 
    res.send("Error 404");
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
      response.token = "666" // temporary token
      response.userID = temp.MaNguoiDung
      response.userGrade = temp.Lop
      response.userType = temp.LoaiNguoiDung

      // add token to database
    }
    res.send(JSON.stringify(response))
  })
})

router.delete('/dangxuat', (req, res, next) => {
  let verified = checkAuth.verify(req)

  if (verified === true) {
    let item = req.body
    let logoutQuery = "TBA"
    // remove token from database

    res.send(JSON.stringify({
      success: true
    }))
  }
  else {
    res.send(JSON.stringify({
      success: false,
      message: "Error 404"
    }))
  }

  
})

router.get('/lay/:userID', (req, res, next) => {
  let verified = checkAuth.verify(req)

  if (verified === true) {
    let userID = req.params.userID
    let getUserInfoQuery = "SELECT * FROM NguoiDung WHERE MaNguoiDung = " + userID
    pool.query(getUserInfoQuery, (error, result) => {
      if (error) throw error
      res.send(JSON.stringify({
        success: true,
        info: result
      }))
    })
  }
  else {
    res.send(JSON.stringify({
      success: false,
      message: "Error 404"
    }))
  }  
})

// ko cần chứng thực, ai cũng xem được.
router.get('/lay', (req, res, next) => {
  let query = "SELECT * FROM NguoiDung ORDER BY DiemTichLuy DESC"
  pool.query(query, function (err, result) {
    if (err) throw err;
      res.send(JSON.stringify(result))
  });
})

module.exports = router;