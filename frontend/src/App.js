import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './page/Result';
import Questions from './page/Questions';


function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/result' Component={Result} />
                    <Route path='/' Component={Questions} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
