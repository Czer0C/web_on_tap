var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')

var checkAuth = require('../utility/checkAuth')
var utility = require('../utility/utility')

router.get('/',  (req, res, next) => {
    let t = checkAuth.verify(req)
    
    if (t === true) {
        res.send('Section');
    }
    else {
        res.send("Error 404")
    }
});

router.get('/lay/:userID', (req, res, next) => {
    let verified = checkAuth.verify(req)
    
    if (verified === true) {
        let userID = req.params.userID
        let getUserSectionQuery = "SELECT * FROM PhienLamBai WHERE MaNguoiDung = " + userID

        pool.query(getUserSectionQuery, (error, result) => {
            if (error) throw error

            res.send(JSON.stringify({
                success: true,
                sections: result
            }))
        })
    }
    else {
        res.send(JSON.stringify({
            success: false,
            message: "Error 404."
        }))
    }
})

router.post('/batdau', (req, res, next) => {
    let verified = checkAuth.verify(req)
    
    if (verified === true) {
        let data = req.body
        let startTime = new Date()
        let sectionID = -1
        let getSectionIDQuery = "SELECT MaPhienLamBai FROM PhienLamBai WHERE MaPhienLamBai=(SELECT MAX(MaPhienLamBai) FROM PhienLamBai)"
        let insertSectionQuery =  `INSERT INTO PhienLamBai (MaNguoiDung, MaBaiKiemTra, ThoiGianBatDau, KetThuc)
                                    VALUES ('${data.userID}', '${data.examID}', '${startTime.toISOString().replace('Z', '').replace('T', ' ')}', '0')
                                    `
        pool.query(insertSectionQuery, (error, result) => {
            if (error) throw error

            if (result.affectedRows) {
                pool.query(getSectionIDQuery, (error, result) => {
                    if (error) throw error
                    
                    sectionID = JSON.parse(JSON.stringify(result))[0].MaPhienLamBai
                    //console.log(sectionID)
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
        const {
            userID,
            examID,
            choices,
            sectionID
        } = req.body

        let endTime = new Date()
        let getQuestionQuery = `SELECT * FROM CauHoi WHERE MaBaiKiemTra = '${examID}'`

        pool.query(getQuestionQuery, (error, questions) => {
            if (error) throw error

            let mark = utility.getMark(choices, questions)

            let score = 100 * mark
            let updateSectionQuery =  `UPDATE PhienLamBai 
                                    SET ThoiGianKetThuc = '${endTime.toISOString().replace('Z', '').replace('T', ' ')}', DiemSo = '${score}', KetThuc = '1'
                                    WHERE (MaPhienLamBai = '${sectionID}')
                                    `
            pool.query(updateSectionQuery, (error, result) => {
                if (error) throw error
                
                if (result.affectedRows) {

                    let updateUserEXPQuery = `UPDATE NguoiDung SET DiemTichLuy = DiemTichLuy + ${score} WHERE MaNguoiDung = ${userID}`
                
                    pool.query(updateUserEXPQuery, (error, result) => {
                        if (error) throw error

                        if (result.affectedRows) {
                            res.send(JSON.stringify({
                                success: true,
                                mark: mark,
                                score: score
                            }))

                        }
                        else {
                            res.send(JSON.stringify({
                                success: false,
                                message: "Không thể cập nhật dữ liệu phiên, hãy thử lại."
                            }))
                        }
                    })
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