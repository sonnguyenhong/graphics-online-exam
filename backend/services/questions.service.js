const QuestionsModel = require("../models/questions.model")

const getAllQuestions = async () => {
    return await QuestionsModel.find().select('-isCorrect');
}

const computeResult = async (answeredQuestions) => {

}

module.exports = {
    getAllQuestions,
}