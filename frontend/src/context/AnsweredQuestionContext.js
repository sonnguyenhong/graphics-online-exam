import React, { createContext, useContext, useEffect, useState } from 'react';

const AnsweredQuestionContext = createContext();

export function AnsweredQuestionProvider({ children }) {
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('answeredQuestions')) || [];
        setAnsweredQuestions(storedAnswers);
    }, []);

    const updateAnsweredQuestions = (questionId, answerId) => {
        setAnsweredQuestions(prevAnswers => (
            {
                ...prevAnswers,
                [questionId]: answerId,
            }
        ));

        // Update localStorage
        localStorage.setItem('answeredQuestions', JSON.stringify({
            ...answeredQuestions,
            [questionId]: answerId,
        }));
    }

    return (
        <AnsweredQuestionContext.Provider value={{ answeredQuestions, updateAnsweredQuestions }}>
            {children}
        </AnsweredQuestionContext.Provider>
    );
}

export function useAnsweredQuestionContext() {
    return useContext(AnsweredQuestionContext);
}