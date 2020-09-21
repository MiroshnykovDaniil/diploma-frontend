import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'


class Course extends Component{
    constructor(props) {
        super(props);
        console.log(props);
    }

    render(){
        if(!this.props.watchedCourse) {
            
                    
        }

        return(
            <div className="course-container">
                <div className="container">
                    <div className="course-title">
                        <h2>{this.props.course.title}</h2>
                    </div>
                    <div className="course-desc">
                        <h2>{this.props.course.description}</h2>
                    </div>
                </div>
            </div>
        );
    }

}

export default Course;