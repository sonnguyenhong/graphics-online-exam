const { model, Schema, Types } = require('mongoose');

// Declare the Schema of the Mongo model
const answerSchema = new Schema(
    {
        content: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
        }
    }
);

// Declare the Schema of the Mongo model
const questionSchema = new Schema(
    {
        question: {
            type: String,
        },  
        answers: {
            type: [answerSchema]
        }
    },
    {
        timestamps: true,
        collection: 'Questions',
    },
);

//Export the model
module.exports = model('Question', questionSchema);
