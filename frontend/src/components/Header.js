import instance from "../configs/axios";

function Header() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions'));
        console.log(answeredQuestions);
        instance.post('/questions/compute-result', {
            answeredQuestions: answeredQuestions,
        }).then(result => {
            console.log(result.data);
        }).catch(err => {
            console.log(err.message);
        })
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
