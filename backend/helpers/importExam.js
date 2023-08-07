const XLSX = require('xlsx');
const QuestionsModel = require('../models/questions.model');

const columnMapping = {
    'Câu hỏi': 'question',
    'A. Câu trả lời đúng': 'answerA',
    'B. Sai': 'answerB',
    'C.Sai': 'answerC',
    'D.Sai': 'answerD',
};

const importExam = () => {
    const file = XLSX.readFile('dethi.xlsx');
    const sheets = file.SheetNames;
    const data = XLSX.utils.sheet_to_json(file.Sheets[sheets[1]])

    let mappedData = data.map((row) => {
        const mappedRow = {};
        Object.keys(row).forEach((colName) => {
            if(Object.keys(columnMapping).indexOf(colName) !== -1) {
                const englishName = columnMapping[colName] || colName;
                mappedRow[englishName] = row[colName];
            }
        });
        return mappedRow;
    });

    mappedData = mappedData.map((row) => {
        return {
            question: row.question,
            answers: [
                {
                    content: row.answerA, 
                    isCorrect: true,
                },
                {
                    content: row.answerB, 
                    isCorrect: false,
                },
                {
                    content: row.answerC, 
                    isCorrect: false,
                },
                {
                    content: row.answerD, 
                    isCorrect: false,
                }
            ]
        }
    });
    console.log(mappedData.length);
    // QuestionsModel.insertMany(mappedData).then(result => {
    //     console.log('Import question successfully');
    // }).catch(err => {
    //     console.log(err)
    //     console.log('Fail to import question');
    // })
}

module.exports = {
    importExam,
}