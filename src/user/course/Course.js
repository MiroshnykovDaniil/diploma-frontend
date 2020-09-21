import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'
import {getCourseInfo} from '../../util/APIUtils';


class Course extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            course:null
        }
    }

    componentDidMount(){
        this.loadCourse(this.props.course.id)
    }

    loadCourse(course){
        getCourseInfo(course)    
          .then(response =>{
            this.setState({
            course: response,
          });
        });
  
      }


    render(){
        if(this.state.course==null) 
            return null;

        let lessonList;
        if (this.state.course.lessons.length >0){
            lessonList=this.state.course.lessons.map((lesson) =>
            <div key = {lesson.id}>
                    <NavLink to={{pathname:"/lesson"}}
                    onClick={()=>
                        this.props.handleSetLesson(lesson)
                    }>{lesson.title}</NavLink> 

                <p>{lesson.description}</p>
            </div>
            );
        }

        return(
            <div className="course-container">
                <div className="container">
                    <div className="course-title">
                        <h2>{this.state.course.title}</h2>
                    </div>
                    <div className="course-desc">
                        <h2>{this.state.course.description}</h2>
                    </div>
                    <div className="lesson-list"></div>
                    {lessonList}
                </div>
            </div>
        );
    }

}

export default Course;