const path = require('node:path');
const QuestionsModel = require('../models/questions.model');
const QuestionService = require('../services/questions.service');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
// const { computeResult } = require('../helpers/computeResult');

const getAllQuestion = async (req, res, next) => {
    try {
        const questions = await QuestionService.getAllQuestions();
        return res.status(200).json({
            message: 'Get all questions successfully',
            data: questions,
        })
    } catch (err) {
        next(err);
    }
}

const evalResult = async (req, res, next) => {
    try {
        const answeredQuestions = req.body.answeredQuestions;
        const questionIds = Object.keys(answeredQuestions);
        const numberOfThreads = 2;
        const chunkSize = Math.ceil(questionIds.length / numberOfThreads);
        const chunks = []
        
        for (let i = 0 ; i < questionIds.length ; i+=chunkSize) {
            const chunkKeys = questionIds.slice(i, i+chunkSize);
            const chunk = {};
            for (const key of chunkKeys) {
                chunk[key] = answeredQuestions[key];
            }
            chunks.push(chunk);
        }

        const workers = []
        
        const questions = await QuestionService.getAllQuestions();
    
        for(const chunk of chunks) {
            const data = {
                chunk: chunk,
                questions: JSON.stringify(questions)
            }
            const worker = new Worker(path.join(__dirname, '../helpers/computeResultWorker.js'), {
                workerData: data,
            });
            workers.push(worker);
        }
        const results = [];
        for (const worker of workers) {
            worker.on('message', result => {
                results.push(result);
                if(results.length === workers.length) {
                    console.log(results);
                    res.status(200).json({ results: results.reduce((sum, a) => sum + a, 0) });
                }
            })

            worker.on('error', err => {
                console.log(err.message);
            })
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllQuestion, 
    evalResult,
}