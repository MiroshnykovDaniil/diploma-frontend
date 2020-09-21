import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
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

        return(
            <div className="course-container">
                <div className="container">
                    <div className="course-title">
                        <h2>{this.state.course.title}</h2>
                    </div>
                    <div className="course-desc">
                        <h2>{this.state.course.description}</h2>
                    </div>
                </div>
            </div>
        );
    }

}

export default Course;