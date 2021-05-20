import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import AppFooter from '../common/AppFooter';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';

import Teacher from '../user/teacher/Teacher';
//import Teacher from '../user/teacher/Teacher2';


import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import {getGroupList} from '../util/APIUtils';
import Course from '../user//course/Course';
import Lesson from '../user/lesson/Lesson';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
      userGroups:null,
      course:null,
      watchedCourse: false,
      courseId:null,
      lesson:null,
      teacher:false,
      watchedLesson:false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });


    getGroupList()
    .then(response =>{
      this.setState({
        userGroups: response
      });
    })

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false,
      });
      if (this.state.currentUser.roles.indexOf("TEACHER")!=-1)
      this.setState(
        {teacher:true}
        );
    }).catch(error => {
      this.setState({
        loading: false
      });  
    }); 
    

  }




  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  setCourse(course){
    this.setState({
      course:course,
      watchedCourse:true
    });
  }

  setLesson(lesson){
    this.setState({
      lesson:lesson,
      watchedLesson:true
    });
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} teacher={this.state.teacher} watchedCourse={this.state.watchedCourse} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>           
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} userGroups={this.state.userGroups}
            watchedCourse = {this.state.watchedCourse} course={this.state.course} handleSetCourse={this.setCourse.bind(this)}
              component={Profile}></PrivateRoute>
              <Route path="/teacher"
              render={(props) => <Teacher loadCurrentlyLoggedInUser={this.loadCurrentlyLoggedInUser} authenticated={this.state.authenticated} currentUser={this.state.currentUser} userGroups={this.state.userGroups} />} ></Route>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
            <Route path ="/courses"
              render={(props) => <Course authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              userGroups={this.state.userGroups}  {...props} />} ></Route>
             <Route path ="/lesson"
              render={(props) => <Lesson authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              watchedCourse={this.state.watchedCourse} course={this.state.course} lesson={this.state.lesson}  {...props} />} ></Route>


            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <div className="app-bottom">
        {/* <AppFooter/> */}
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>

    );
  }
}

export default App;