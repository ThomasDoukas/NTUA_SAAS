import React, {useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from './Containers/Home';
import AskQuestion from './Containers/AskQuestion';
import AnswerQuestion from './Containers/AnswerQuestion';
import MyProfile from './Containers/MyProfile';
import ByPeriod from './Containers/ByPeriod';
import ByKeyword from './Containers/ByKeyword';
import BrowseQuestions from './Containers/BrowseQuestions';
import Layout from './hoc/Layout';
import AuthContext from './source/auth-context';
import AuthForm from './Components/Auth/AuthForm';
import MyQuestions from './Containers/MyQuestions';
import MyAnswers from './Containers/MyAnswers';
import ContribPerDay from './Containers/ContribPerDay';
import EditQuestion from './Containers/EditQuestion';
import EditAnswer from './Containers/EditAnswer';
import EditProfile from './Containers/EditProfile';

const App = (props) => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <Layout>
            <Route exact path="/" component={Home}/>
            <Route exact path="/auth">
                {!isLoggedIn && <AuthForm/>}
            </Route>
            <Route exact path="/ask">
                {isLoggedIn && <AskQuestion/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/editquestion">
                {isLoggedIn && <EditQuestion/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/answer">
                {isLoggedIn && <AnswerQuestion/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/editanswer">
                {isLoggedIn && <EditAnswer/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/browse">
                {isLoggedIn && <BrowseQuestions/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/myprofile">
                {isLoggedIn && <MyProfile/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/myprofile/myquestions">
                {isLoggedIn && <MyQuestions/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/myprofile/myanswers">
                {isLoggedIn && <MyAnswers/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/myprofile/contrib">
                {isLoggedIn && <ContribPerDay/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/myprofile/editprofile">
                {isLoggedIn && <EditProfile/>}
                {!isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            <Route exact path="/byperiod" component={ByPeriod} />
            <Route exact path="/bykeyword" component={ByKeyword} />
        </Layout>
    );
}

export default App;