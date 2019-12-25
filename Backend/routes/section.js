var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')

var checkAuth = require('../utility/checkAuth')

router.get('/',  (req, res, next) => {
    let t = checkAuth.verify(req)
    
    if (t === true) {
        res.send('Section');
    }
    else {
        res.send("Error 404")
    }
});

router.post('/batdau', (req, res, next) => {
    let verified = checkAuth.verify(req)
    
    if (verified === true) {
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
                    
                    sectionID = JSON.parse(JSON.stringify(result))[0].MaPhienLamBai
                    console.log(sectionID)
                    res.send(JSON.stringify({
                        success: true,
                        sectionID: sectionID
                    }))
                })
            }
            else {
                res.send(JSON.stringify({
                    success: false,
                    message: "Không thể tạo mới phiên, hãy thử lại."
                }))
            }
        })
    }
    else {
        res.send(JSON.stringify({
            success: false,
            message: "Error 404!"
        }))
    }
})

router.patch('/ketthuc', (req, res, next) => {
    let verified = checkAuth.verify(req)

    if (verified === true) {
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
                        success: false,
                        message: "Không thể cập nhật dữ liệu phiên, hãy thử lại."
                    }))
                }
            })
        })
    }
    else {
        res.send(JSON.stringify({
            success: false,
            message: "Error 404!"
        }))
    }
})

module.exports = router;