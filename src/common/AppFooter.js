import React, { Component } from 'react';
import './AppFooter.css'

class AppFooter extends Component{
    render(){
        return (
            <footer className="app-footer">
                <div className="container">
                    <section className="browse"></section>
                    <section className="footer-about">
                        <h5>About application</h5>
                        <ul>
                            <li><a>123</a></li>
                            <li><a>456</a></li>
                            <li><a>789</a></li>
                        </ul>
                    </section>
                </div>
            </footer>
        )
    }

}

export default AppFooter;