import '../App.css';
import Question from '../components/Question';
import React, { useEffect, useState } from "react";
import instance from '../configs/axios';
import Header from '../components/Header';


function Questions() {
    const [questions, setQuestions] = useState([]);

    /**
     * answeredQuestions: [
     * {
     *      questionId,
     *      answerId,
     * }]
     */

    useEffect(() => {
        if(!localStorage.getItem('questions')) {
            instance.get('/questions')
                .then(response => {
                    setQuestions(response.data.data);
                    localStorage.setItem('questions', JSON.stringify(response.data.data));
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else {
            setQuestions(JSON.parse(localStorage.getItem('questions')));
        }
    }, []);

    return (
        <div>
            <Header />
            <div className='Questions'>
                {
                    questions.map((question, index) => {
                        return (
                            <Question key={index} questionId={question._id} question={question.question} answers={question.answers} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Questions;
