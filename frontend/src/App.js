import './App.css';
import Header from './components/Header';
import Question from './components/Question';
import React, { useEffect, useState } from "react";
import instance from './configs/axios';


function App() {
    const [questions, setQuestions] = useState([]);

    /**
     * answeredQuestions: [
     * {
     *      questionId,
     *      answerId,
     * }]
     */

    useEffect(() => {
        instance.get('/questions')
            .then(response => {
                setQuestions(response.data.data);
            })
            .catch(err => {
                console.error(err.message);
            })
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

export default App;
