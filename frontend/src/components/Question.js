import { useEffect, useState } from "react";
import { useAnsweredQuestionContext } from "../context/AnsweredQuestionContext";

function Question(props) {
    const { answeredQuestions, updateAnsweredQuestions } = useAnsweredQuestionContext();
    const [checkedAnswer, setCheckedAnswer] = useState();

    const handleClickAnswer = (e) => {
        // e.preventDefault();
        setCheckedAnswer(e.target.value);
        updateAnsweredQuestions(props.questionId, e.target.value);
    }

    useEffect(() => {
        if(Object.keys(answeredQuestions).includes(props.questionId)) {
            setCheckedAnswer(answeredQuestions[props.questionId]);
        }
    }, [answeredQuestions, checkedAnswer, props.questionId])

    return (
        <div className="Question">
            <p className="Question_Content">Question: {props.question}</p>
            <div className="Question_Answer">
                <div className="Question_Answer_Content">
                    <input
                        checked={checkedAnswer === props.answers[0]._id}
                        onChange={handleClickAnswer} 
                        id={props.answers[0]._id} 
                        name={props.questionId} 
                        value={props.answers[0]._id} 
                        className="Question_Answer_Content_Input" 
                        type="radio" />
                    <label htmlFor={props.answers[0]._id}>A. {props.answers[0].content} </label>
                </div>
                <div className="Question_Answer_Content">
                    <input 
                        checked={checkedAnswer === props.answers[1]._id}
                        onChange={handleClickAnswer}
                        id={props.answers[1]._id} 
                        name={props.questionId} 
                        value={props.answers[1]._id} 
                        className="Question_Answer_Content_Input" 
                        type="radio" />
                    <label htmlFor={props.answers[1]._id}>B. {props.answers[1].content} </label>
                </div>
                <div className="Question_Answer_Content">
                    <input 
                        checked={checkedAnswer === props.answers[2]._id}
                        onChange={handleClickAnswer} 
                        id={props.answers[2]._id} 
                        name={props.questionId} 
                        value={props.answers[2]._id} 
                        className="Question_Answer_Content_Input" 
                        type="radio" />
                    <label htmlFor={props.answers[2]._id}>C. {props.answers[2].content} </label>
                </div>
                <div className="Question_Answer_Content">
                    <input 
                        checked={checkedAnswer === props.answers[3]._id}
                        onChange={handleClickAnswer} 
                        id={props.answers[3]._id} 
                        name={props.questionId} 
                        value={props.answers[3]._id} 
                        className="Question_Answer_Content_Input" 
                        type="radio" />
                    <label htmlFor={props.answers[3]._id}>D. {props.answers[3].content} </label>
                </div>
            </div>
        </div>
    );
}

export default Question;
