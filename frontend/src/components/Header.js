import { useNavigate } from "react-router-dom";
import instance from "../configs/axios";
import { useAnsweredQuestionContext } from "../context/AnsweredQuestionContext";

function Header() {
    const navigate = useNavigate();
    const { setAnsweredQuestions } = useAnsweredQuestionContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions'));
        console.log(answeredQuestions);
        if(answeredQuestions) {
            instance.post('/questions/compute-result', {
                answeredQuestions: answeredQuestions,
            }).then(result => {
                console.log(result.data);
                navigate('/result', {
                    state: {
                        result: result.data.results,
                    }
                });
                localStorage.removeItem('answeredQuestions');
                setAnsweredQuestions([]);
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            console.log("You haven't answered any question");
        }
    }

    return (
        <div className="Header">
            <h1>Graphics Final Test Exam</h1>
            <p className="Header_copyright">By Nguyen Hong Son</p>
            <div className="Header_Btn_Group">
                <p className="Header_Answered_Questions">Number of answerd questions: </p>
                <button className="Header_Submit_Btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Header;
