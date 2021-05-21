import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Containers/Home';
import SignIn from './Containers/SignIn';
import LogIn from './Containers/LogIn';
import AskQuestion from './Containers/AskQuestion';
import AnswerQuestion from './Containers/AnswerQuestion';
import MyProfile from './Containers/MyProfile';
import ByPeriod from './Containers/ByPeriod';
import ByKeyword from './Containers/ByKeyword';
import BrowseQuestions from './Containers/BrowseQuestions';
import Question from './Containers/Question';
import Layout from './hoc/Layout';
import NavBar from './Components/Navbar';
import Footer from './Components/Footer';

class App extends React.Component {

    state = {
        loggedin: false,
        questions: [{
            title: 'Question 1',
            body: 'This is the body of the first question. I would like to ask you if you know how to enter the cult. I have been trying for ages but I cant figure out the way.',
            labels: '#cult, #wena, #indlovu, #enter'
        },
        {
            title: 'Question 2',
            body: 'Now that I have found a way to enter the cult, can you please show me the way out? I have been here for ages and i think I am stuck in this endless pit of destruction.',
            labels: '#escape, #cult, #help'
        },
        {
            title: 'Question 3',
            body: 'I have figured that there is indeed no way out of the cult. Can you tell me, at least, how can I best serve the Wena Indlovu masters?',
            labels: '#serve, #worship, #wena, #indlovu'
        },
        {
            title: 'Question 4',
            body: 'Are you done with this elaborate joke?',
            labels: '#idiot'
        }]
    }

    handleLogIn = (newvalue) => {
        this.setState({ loggedin: newvalue })
    }

    render() {
        return (
            <Layout>
                <Route exact path="/" render={props => <Home {...props} loggedin={this.state.loggedin} onLogIn={this.handleLogIn} />} />
                <Route exact path="/signin" render={props => <SignIn {...props} loggedin={this.state.loggedin} onLogIn={this.handleLogIn} />} />
                <Route exact path="/login" render={props => <LogIn {...props} loggedin={this.state.loggedin} onLogIn={this.handleLogIn} />} />
                <Route exact path="/ask" component={AskQuestion} />
                <Route exact path="/answer" component={AnswerQuestion} />
                <Route exact path="/browse" render={props => <BrowseQuestions {...props} questions={this.state.questions} />} />
                <Route exact path="/myprofile" render={props => <MyProfile {...props} loggedin={this.state.loggedin} onLogIn={this.handleLogIn} />} />
                <Route exact path="/byperiod" component={ByPeriod} />
                <Route exact path="/bykeyword" component={ByKeyword} />
            </Layout>
        );
        // return (
        //   <div className="App" style={{position: "relative", "min-height": "100vh"}}>
        //     <NavBar loggedin={this.state.loggedin} onLogIn={this.handleLogIn} />
        //     <Route exact path="/" render={props => <Home {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        //     <Route exact path="/signin" render={props => <SignIn {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        //     <Route exact path="/login" render={props => <LogIn {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        //     <Route exact path="/ask" component={AskQuestion} />
        //     <Route exact path="/answer" component={AnswerQuestion} />
        //     <Route exact path="/browse" render={props => <BrowseQuestions {...props} questions={this.state.questions}/>} />
        //     <Route exact path="/myprofile" render={props => <MyProfile {...props} loggedin={this.state.loggedin} onLogIn = {this.handleLogIn}/>}/>
        //     <Route exact path="/byperiod" component={ByPeriod} />
        //     <Route exact path="/bykeyword" component={ByKeyword} />
        //     <Footer/>
        //   </div>
        // );
    }
}

export default App;