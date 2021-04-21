import React from 'react';
//import './App.css';
import Home from './Components/Home';
import NavBar from './Components/Navbar';
import SignIn from './Components/SignIn';
import LogIn from './Components/LogIn';
import AskQuestion from './Components/AskQuestion';
import AnswerQuestion from './Components/AnswerQuestion';
import MyProfile from './Components/MyProfile';
import ByPeriod from './Components/ByPeriod';
import ByKeyword from './Components/ByKeyword';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/ask" component={AskQuestion} />
      <Route exact path="/answer" component={AnswerQuestion} />
      <Route exact path="/myprofile" component={MyProfile} />
      <Route exact path="/byperiod" component={ByPeriod} />
      <Route exact path="/bykeyword" component={ByKeyword} />
    </div>
  );
}

export default App;