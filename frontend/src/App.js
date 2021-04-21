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

class App extends React.Component{

  state = {
    loggedin: false
  }

  handleLogIn = (newvalue) => {
    this.setState({ loggedin: newvalue })
    }



  render(){
    return (
      <div className="App">
        <NavBar loggedin={this.state.loggedin} onLogIn={this.handleLogIn} />
        <Route exact path="/" render={props => <Home {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        <Route exact path="/signin" render={props => <SignIn {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        <Route exact path="/login" render={props => <LogIn {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        <Route exact path="/ask" component={AskQuestion} />
        <Route exact path="/answer" component={AnswerQuestion} />
        <Route exact path="/myprofile" render={props => <MyProfile {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        <Route exact path="/byperiod" component={ByPeriod} />
        <Route exact path="/bykeyword" component={ByKeyword} />
      </div>
    );
  }
}

export default App;