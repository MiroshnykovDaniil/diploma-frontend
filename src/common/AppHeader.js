import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }


    render() {
        let button;
        // if(this.props.authenticated && this.props.watchedCourse){
        //     button = (
        //         <ul>
        //             <li>
        //                 <NavLink to="/course">Back to course</NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to="/profile">Profile</NavLink>
        //             </li>
        //             <li>
        //                 <a onClick={this.props.onLogout}>Logout</a>
        //             </li>
        //         </ul>
        //     );

        // }
        if (this.props.authenticated&&this.props.teacher){
            button = (
                <ul>
                    <li>
                        <NavLink to="/teacher">Панель вчителя</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Профіль</NavLink>
                    </li>
                    <li>
                        <a onClick={this.props.onLogout}>Вийти з системи</a>
                    </li>
                </ul>
            );
        }
        else if (this.props.authenticated){
            button = (
                <ul>
                    <li>
                        <NavLink to="/courses">Навчальні курси</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Профіль</NavLink>
                    </li>
                    <li>
                        <a onClick={this.props.onLogout}>Вийти з системи</a>
                    </li>
            </ul>
            );
        }
        else{
            button = (
                <ul>
                    <li>
                        <NavLink to="/login">Увійти в систему</NavLink>        
                    </li>
                    <li>
                        <NavLink to="/signup">Зареєструватись</NavLink>        
                    </li>
                </ul>
            )
        };

        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">Система навчання</Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                                {button}                                
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;
