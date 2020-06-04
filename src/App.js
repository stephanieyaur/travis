import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import EmailForm from './components/EmailForm';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA5lzLkdABb8wav-5S6SS6IlVrAUbEAt3g",
  authDomain: "freedom-generator.firebaseapp.com",
  databaseURL: "https://freedom-generator.firebaseio.com",
  projectId: "freedom-generator",
  storageBucket: "freedom-generator.appspot.com",
  messagingSenderId: "443391604522",
  appId: "1:443391604522:web:a65469e67d07ff9957d053",
  measurementId: "G-XCW6KBRVCT"
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/email" component={EmailForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;