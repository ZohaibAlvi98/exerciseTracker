import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route  } from "react-router-dom"
import logo from './logo.svg';
import './App.css';

function App() {
  return (
   <Router>
     <Navbar />
     <br/>
     <Route path='/' exact component={ExercisesList} />
     <Route path='/edit/:id' exact component={EditExercise} />
     <Route path='/create' exact component={CreateExercise} />
     <Route path='/user' exact component={CreateUser} />

   </Router>
  );
}

export default App;
