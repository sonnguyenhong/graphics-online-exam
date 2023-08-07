const QuestionsModel = require('../models/questions.model');
const mongoose = require('mongoose');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');

const chunk = workerData.chunk;
const questions = JSON.parse(workerData.questions);

let correctAnswers = 0;

// console.log(chunk);
const questionIds = Object.keys(chunk);

for(const question of questions) {
    if(questionIds.includes(question._id)) {
        for(const answer of question.answers) {
            if(answer._id === chunk[question._id] && answer.isCorrect === true) {
                correctAnswers++;
                break;
            }
        }
    }
}

console.log(correctAnswers);
parentPort.postMessage(correctAnswers);