// Từ mảng JSON biến thành mảng giá trị đề chèn MySQL
// Ví dụ
// Đầu vào:
// [{ ID: 0, examID: '', content: '' },{ ID: 1, examID: '', content: '' }] và newExamID = 59
// Đầu ra:
// [[ 0, 59, '' ],[ 1, 59, '' ],]
getQuestionValues = (questionList, newExamID) => {
    var result = []
    questionList.forEach(question => {
        var temp = []
        temp.push(question.ID)
        temp.push(newExamID)
        temp.push(question.content)
        result.push(temp)
    });
    return result
}

// Tương tự như trên
getChoiceValues = (choiceList, newExamID) => {
    var result = []
    choiceList.forEach(choice => {
        var temp = []
        temp.push(choice.ID)
        temp.push(choice.questionID)
        temp.push(newExamID)
        temp.push(choice.content) 
        temp.push(choice.isCorrect)
        result.push(temp)
    });
    return result
}

validateRegister = (input) => {
    let result = {
        isValid: false,
        message: "",
        code: 0
    }

    if (input.fullname === '') {
        result.message = "Họ tên không được để trống."
        result.code = 1
    }
    else if (input.grade === '') {
        result.message = "Lớp không được để trống."        
        result.code = 2
    }
    else if (isNaN(parseInt(input.grade))) {
        result.message = "Lớp phải là một giá trị số."
        result.code = 3
    }
    else if (parseInt(input.grade) < 1 || parseInt(input.grade) > 5)  {
        result.message = "Lớp phải từ 1 tới 5."
        result.code = 4
    }
    else if (input.email === '') {
        result.message = "Email không được để trống."    
        result.code = 5
    }
    else if (input.username === '') {
        result.message = "Tên đăng nhập không được để trống."        
        result.code = 6
    }
    else if (input.password === '') {
        result.message = "Mật khẩu không được để trống."    
        result.code = 7
    }
    else if (input.password.length < 6) {
        result.message = "Mật khẩu quá yếu, cần ít nhất 6 ký tự."
        result.code = 8
    }
    else if (input.repassword === '') {
        result.message = "Bạn chưa nhập lại mật khẩu."
        result.code = 9
    }
    else if (input.password !== input.repassword) {
        result.message = "Bạn chưa nhập lại đúng mật khẩu."
        result.code = 10
    }
    else
        result.isValid = true
    return result
}

validateUpdateUser = input => {
    let result = {
        isValid: false,
        message: "",
        code: 0
    }

    if (input.inputUsername === '') {
        result.message = "Tên đăng nhập không được để trống."
        result.code = 1
    }
    else if (input.inputEmail === '') {
        result.message = "Email không được để trống."
        result.code = 2
    }
    else if (input.inputFullname === '') {
        result.message = "Họ tên không được để trống."
        result.code = 3
    }
    else if (input.inputGrade === '') {
        result.message = "Lớp không được để trống."        
        result.code = 4
    }
    else if (isNaN(parseInt(input.inputGrade))) {
        result.message = "Lớp phải là một giá trị số."
        result.code = 5
    }
    else if (parseInt(input.inputGrade) < 1 || parseInt(input.inputGrade) > 5)  {
        result.message = "Lớp phải từ 1 tới 5."
        result.code = 6
    }
    else
        result.isValid = true
    return result
}

validateNewPassword = input => {
    let result = {
        isValid: false,
        message: "",
        code: 0
    }
    if (input.oldPassword === '') {
        result.message = "Mật khẩu cũ không được để trống."
        result.code = 1
    }
    else if (input.newPassword === '') {
        result.message = "Bạn chưa nhập mật khẩu mới."
        result.code = 2
    }
    else if (input.newPassword.length < 6) {
        result.message = "Mật khẩu mới quá yếu, cần ít nhất 6 ký tự."
        result.code = 3
    }
    else if (input.reNewPassword === '') {
        result.message = "Bạn chưa nhập lại mật khẩu mới."
        result.code = 4
    }
    else if (input.newPassword !== input.reNewPassword) {
        result.message = "Bạn chưa nhập lại đúng mật khẩu mới."
        result.code = 5
    }
    else
        result.isValid = true
    return result
}

module.exports.getQuestionValues = getQuestionValues;
module.exports.getChoiceValues = getChoiceValues;
module.exports.validateRegister = validateRegister;
module.exports.validateUpdateUser = validateUpdateUser;
module.exports.validateNewPassword = validateNewPassword;