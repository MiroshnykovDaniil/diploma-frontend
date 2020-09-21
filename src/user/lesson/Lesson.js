import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'
import {getLessonById} from '../../util/APIUtils';

class Lesson extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            lesson:null
        }
    }

    componentDidMount(){
        this.loadLesson(this.props.lesson.id)
    }

    loadLesson(course){
        getLessonById(course)    
          .then(response =>{
            this.setState({
                lesson: response,
          });
        });
  
      }


    render(){

        if(this.state.lesson==null) 
            return null;

    //     let lessonList;
    //     if (this.state.course.lessons.length >0){
    //         lessonList=this.state.course.lessons.map((lesson) =>
    //         <div key = {lesson.id}>
    //             <a>
    //                 <NavLink to={{pathname:"/lesson"}}
    //                 onClick={()=>
    //                     this.props.userGroups.handleSetLesson(lesson)
    //                 }>{lesson.title}</NavLink> 
    //             </a>
    //             <p>{lesson.description}</p>
    //         </div>
    //         );
    //     }

        return(
            <div className="lesson-container">
                <div className="container">
                    <div className="lesson-title">
                        <h2>{this.state.lesson.title}</h2>
                    </div>
                    <div className="lesson-desc">
                        <h2>{this.state.lesson.description}</h2>
                    </div>
                </div>
            </div>
        );
    }

}

export default Lesson;