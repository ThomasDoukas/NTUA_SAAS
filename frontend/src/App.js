import React from 'react';
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
import BrowseQuestions from './Components/BrowseQuestions';
import Question from './Components/Question';

class App extends React.Component{

  state = {
    loggedin: false,
    questions: [{title: 'Question 1',
                body: 'This is the body of the first question. I would like to ask you if you know how to enter the cult. I have been trying for ages but I cant figure out the way.',
                labels: '#cult, #wena, #indlovu, #enter'}, 
                {title: 'Question 2',
                body: 'Now that I have found a way to enter the cult, can you please show me the way out? I have been here for ages and i think I am stuck in this endless pit of destruction.',
                labels: '#escape, #cult, #help'}, 
                {title: 'Question 3',
                body: 'I have figured that there is indeed no way out of the cult. Can you tell me, at least, how can I best serve the Wena Indlovu masters?',
                labels: '#serve, #worship, #wena, #indlovu'}, 
                {title: 'Question 4',
                body: 'Are you done with this elaborate joke?',
                labels: '#idiot'}]
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
        <Route exact path="/browse" render={props => <BrowseQuestions {...props} questions={this.state.questions}/>} />
        <Route exact path="/myprofile" render={props => <MyProfile {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        <Route exact path="/byperiod" component={ByPeriod} />
        <Route exact path="/bykeyword" component={ByKeyword} />
      </div>
    );
  }
}

export default App;