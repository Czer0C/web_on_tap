var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')

var checkAuth =  require('../utility/checkAuth')
var utility = require('../utility/utility')
var bcrypt = require('bcrypt');

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
  let loginQuery = `SELECT * FROM NguoiDung WHERE TenDangNhap = '${item.username}'`
  pool.query(loginQuery, (error, result) => {
    if (error) throw error
    let response = {
      success: false
    }
    if (result.length !== 0) {
      let temp = JSON.parse(JSON.stringify(result))[0]

      bcrypt.compare(item.password, temp.MatKhau, (error, result) => {
        if (error) throw error
        
        response.success = result
        response.token = "666" // temporary token
        response.userID = temp.MaNguoiDung
        response.userGrade = temp.Lop
        response.userType = temp.LoaiNguoiDung


        // add token to database
        res.send(JSON.stringify(response))
      })
    }
    else {
      res.send(JSON.stringify({
        response
      }))
    }
  })
})

router.post('/dangky', (req, res, next) => {
  let item = req.body
  
  let validation = utility.validateRegister(item)
  if (validation.isValid) {
    let usernameCheckQuery = `SELECT * FROM NguoiDung WHERE TenDangNhap = '${item.username}'`
    
    pool.query(usernameCheckQuery, (error, result) => {
      if (error) throw error
      
      if (result.length !== 0)
        res.send(JSON.stringify({
          success: false,
          message: "Tên đăng nhập này đã tồn tại.",
          code: 11
        }))
      else {
        let emailCheckQuery = `SELECT * FROM NguoiDung WHERE Email = '${item.email}'`
        
        pool.query(emailCheckQuery, (error, result) => {
          if (error) throw error

          if (result.length !== 0)
            res.send(JSON.stringify({
              success: false,
              message: "Email này đã tồn tại.",
              code: 12
            }))
          else {
            bcrypt.hash(item.password, 10, (error, hashedPassword) => {
              if (error) throw error
              let registerQuery = ` INSERT INTO NguoiDung (HoTen, Lop, MatKhau, DiemTichLuy, TenDangNhap, Email, LoaiNguoiDung) 
                                  VALUES ('${item.fullname}', '${item.grade}', '${hashedPassword}', '0', '${item.username}', '${item.email}', '1')`

              pool.query(registerQuery, (error, result) => {
                if (error) throw error

                res.send(JSON.stringify({
                  success: true
                }))
              })
            });
            
          }
        })
      }
    })

  }
  else {
    res.send(JSON.stringify({
      success: false,
      message: validation.message,
      code: validation.code
    }))
  }
})


router.patch('/capnhatthongtin', (req, res, next) => {
  let verified = checkAuth.verify(req)
  
  if (verified === true) {
    let validation = utility.validateUpdateUser(req.body.info)
    if (validation.isValid) {
      
      let userID = req.body.id
      const {
        inputUsername,
        inputEmail,
        inputFullname,
        inputGrade
      } = req.body.info

      let usernameCheckQuery = `SELECT * FROM NguoiDung WHERE TenDangNhap = '${inputUsername}'`
    
      pool.query(usernameCheckQuery, (error, result) => {
        if (error) throw error

        if (result.length !== 0 && userID !== result[0].MaNguoiDung)
          res.send(JSON.stringify({
            success: false,
            message: "Tên đăng nhập này đã tồn tại.",
            code: 7
          }))
        else {
          let emailCheckQuery = `SELECT * FROM NguoiDung WHERE Email = '${inputEmail}'`
          
          pool.query(emailCheckQuery, (error, result) => {
            if (error) throw error

            if (result.length !== 0 && userID !== result[0].MaNguoiDung)
              res.send(JSON.stringify({
                success: false,
                message: "Email này đã tồn tại.",
                code: 8
              }))
            else {
              let updateUserQuery = `UPDATE NguoiDung 
                                    SET TenDangNhap = '${inputUsername}', Email = '${inputEmail}', HoTen = '${inputFullname}', Lop = '${inputGrade}'
                                    WHERE MaNguoiDung = '${userID}'`
              pool.query(updateUserQuery, (error, result) => {
                if (error) throw error
          
                if (result.affectedRows === 1) {
                  res.send(JSON.stringify({
                    success: true
                  }))
                } 
                else {        
                  res.send(JSON.stringify({
                    success: false,
                    message: "Không thể cập nhật xuống database!",
                    code: 9
                  }))
                }
              })
            }})
        }
      })
    }
    else {
      res.send(JSON.stringify({
        success: false,
        message: validation.message,
        code: validation.code
      }))
    }
    
  }
  else {
    res.send(JSON.stringify({
      success: false,
      message: "ERROR 404!",
      code: -1
    }))
  }
})

router.patch('/capnhatmatkhau', (req, res, next) => {
  let verified = checkAuth.verify(req)
  
  if (verified === true) {
    let item = req.body.info
    let userID = req.body.id
    let validation = utility.validateNewPassword(item)
    
    if (validation.isValid) {
      let getPasswordQuery = `SELECT MatKhau FROM NguoiDung WHERE MaNguoiDung = '${userID}'`

      pool.query(getPasswordQuery, (error, result) => {
        if (error) throw error

        bcrypt.compare(item.oldPassword, result[0].MatKhau, (error, result) => {
          if (error) throw error

          if (result) {
            bcrypt.hash(item.newPassword, 10, (error, newHashedPassword) => {
              if (error) throw error
              
              let updatePasswordQuery = `UPDATE NguoiDung SET MatKhau = '${newHashedPassword}' WHERE MaNguoiDung = '${userID}'`

              pool.query(updatePasswordQuery, (error, result) => {
                if (error) throw error

                if (result.affectedRows === 1) {
                  res.send({
                    success: true
                  })
                }
                else {
                  res.send({
                    success: false,
                    message: "Không thể lưu mật khẩu mới xuống database, hãy thử lại.",
                    code: -1
                  })
                }
              })
            })
            

          }
          else {
            res.send(JSON.stringify({
              success: false,
              message: "Mật khẩu cũ không hợp lệ.",
              code: 6
            }))
          }
        })
      })
    }
    else {
      res.send(JSON.stringify({
        success: false,
        message: validation.message,
        code: validation.code
      }))
    }

    
  }
  else {
    res.send(JSON.stringify({
      success: false,
      message: "Error 404"
    }))
  }
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
  
  // verify token from same user

  if (verified === true) {
    let userID = req.params.userID
    let getUserInfoQuery = "SELECT MaNguoiDung, HoTen, Lop, DiemTichLuy, LoaiNguoiDung, TenDangNhap, Email FROM NguoiDung WHERE MaNguoiDung = " + userID
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