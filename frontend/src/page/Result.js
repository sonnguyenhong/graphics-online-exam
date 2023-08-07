import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";


function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState();

    useEffect(() => {
        setResult(location.state.result);
    }, [])
    
    const handleClickReturn = (e) => {
        e.preventDefault();
        localStorage.removeItem('answeredQuestions');
        navigate('/');
    }

    return (
        <div>
            <Header />
            <div className="Result">
                <h1>Congratulations! You got {result}/392</h1>
                <button className="Return_Btn" onClick={handleClickReturn}>Return to test</button>
            </div>
        </div>
    );
}

export default Result;
