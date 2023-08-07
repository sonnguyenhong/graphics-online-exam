import './App.css';
import Header from './components/Header';
import Question from './components/Question';
import React, { useEffect, useState } from "react";
import instance from './configs/axios';
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
