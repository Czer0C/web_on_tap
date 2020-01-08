var express = require('express')
var router = express.Router()
var pool = require('../Middleware/database')

var utility = require('../utility/utility')
var checkAuth = require('../utility/checkAuth')

router.get('/',  (req, res, next) => {
    let t = checkAuth.verify(req)
    
    if (t === true) {
        res.send('Exams');
    }
    else {
        res.send("Unauthorized Access.")
    }
});

router.get('/laychitiet/:examID', (req, res, next) => {
    let verified = checkAuth.verify(req)

    if (verified === true) {
        let examID = req.params.examID
        let getQuestionsQuery = `SELECT * FROM CauHoi WHERE MaBaiKiemTra = '${examID}' `

        pool.query(getQuestionsQuery, (error, quesions) => {
            if (error) throw error

            let getChoicesQuery = `SELECT * FROM LuaChon WHERE MaBaiKiemTra = '${examID}' `

            pool.query(getChoicesQuery, (error, choices) => {
                if (error) throw error
                
                res.send(JSON.stringify({
                    success: true,
                    questions: quesions,
                    choices: choices
                }))
            })
        })

        
    }
    else {
        res.send(JSON.stringify({
            success: false,
            message: "Error 401."
        }))
    }
})

router.get('/lay', (req, res, next) => {
    let verified = checkAuth.verify(req)
    
    if (verified === true) {
        let getExamQuery = "SELECT * FROM BaiKiemTra"
        pool.query(getExamQuery, (err, result) => {
        if (err) throw err
            res.send(JSON.stringify({
                success: true,
                exams: result
            }))
        })
    }
    else {
        res.send({
            success: false,
            message: "Error 404"
        })
    }
})

router.get('/lay/:examID', (req, res, next) => {
    let verified = checkAuth.verify(req)
    if (verified === true) {
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
                        success: true,
                        examInfo: examInfo,
                        questionInfo: questionInfo,
                        choiceInfo: choiceInfo
                    }))
                })
            })
        })
    }
    else {
        res.send(JSON.stringify({
            success: false,
            message: "Error 404"
        }))
    }
})

router.post('/them', (req, res, next) => {
    let verified = checkAuth.verify(req)
    
    if (verified === true) {
        let requestBody = req.body;
        let getLastExamID = "SELECT MaBaiKiemTra FROM BaiKiemTra WHERE MaBaiKiemTra=(SELECT MAX(MaBaiKiemTra) FROM BaiKiemTra)";
        let insertExamQuery =   `
                            INSERT INTO BaiKiemTra (TenBaiKiemTra, MaHocKy, Lop, ThoiGian, TuaDe, NoiDungBaiDoc, TenTacGia, GhiChu)
                            VALUES  
                            (N'${requestBody.examName}', '${requestBody.semester}', '${requestBody.grade}', '${requestBody.duration}',
                            N'${requestBody.title}', N'${requestBody.content}', N'${requestBody.author}', N'${requestBody.note}') 
                        `;

        pool.query(insertExamQuery, (error, result) => {
            if (error) throw error; 

            pool.query(getLastExamID, (error, result) => {
                if (error) throw error  
                
                var newExamID = 0
                if (result.length !== 0)
                    newExamID = JSON.parse(JSON.stringify(result))[0].MaBaiKiemTra;

                var insertQuestionQuery = "INSERT INTO CauHoi (SoThuTu, MaBaiKiemTra, NoiDung, LoaiCauHoi, CauTraLoi) VALUES ?"
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
    }
    else {
        return res.json({
            success: false,
            message: "Error 404"
        })
    }
})

module.exports = router;