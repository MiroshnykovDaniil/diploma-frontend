import React, { Component } from 'react';
import './Profile.css';
import{
    
} from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    watchCourse(){
        this.props.watchedCourse=true;
    }


    GroupList(props){
        const list = props.userGroups;

        const groupList = list.userGroups.map((group) =>
            <div key={group.id}>
                <h3>{group.title}</h3>
                <li>Count of members: {group.members.length}</li>
                <div>
                    <h3>Assigned courses</h3>
                    {group.assignedCourses.map((course) =>
                        <div key = {course.id}>
                            <ul>
                                <li>
                                        <NavLink to={{pathname:"/course",state:{watchCourse:course}}}>{course.title}</NavLink>
                                </li>
                            </ul>
                            <p>{course.description}</p>
                        </div>
                    )}
                </div>


                <div>
                </div>
            </div>
        );


    
        return(
            <div>
                {groupList}
            </div>
        );

    }


    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                    </div>
                    <div className="groups-info"> 
                        <this.GroupList userGroups = {this.props}/>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Profile
