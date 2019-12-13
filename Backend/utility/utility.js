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

module.exports.getQuestionValues = getQuestionValues;
module.exports.getChoiceValues = getChoiceValues;