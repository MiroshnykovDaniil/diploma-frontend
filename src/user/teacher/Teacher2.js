import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import './Teacher.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
//import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'

class Teacher extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            group:null
        }
        this.GroupList=this.GroupList.bind(this);
    } 

    
    // GroupInfo(list,id){
    //     if (typeof id!=='string')return null;
    //     const Group = list.userGroups.find(x => x.id ===id);

    //     return(

    //         <div>
    //             <div>
    //                 {Group.title}
    //             </div>
    //             <div>
    //                 {Group.members.length}
    //             </div>
    //         </div>
    //     );

       
        
    // }

    GroupList(props){
        const list=props.userGroups;


        const grouplist=list.userGroups.map((group)=>

        <tr key={group.id}>
            <td>{group.title}</td>
            <td>{group.members.length}</td>
            <td>
                <Button text="Inspect" 
                onClick= {()=>this.setState({group:group})}
                ></Button>
            </td>
        </tr>
        );

        return(
            <table>
                <thead>
                    <tr>
                        <th>Group title</th>
                        <th>Count of members</th>
                        <th>Inspect</th>
                    </tr>
                </thead>
                <tbody>
                    {grouplist}
                </tbody>
            </table>
            )
    }


    componentDidMount(){}

    render(){
        let info;

        if(this.state.group!=null){
            info=(
                <div>
                <div>
                    Title: {this.state.group.title}
                </div>
                <div>
                    Members count: {this.state.group.members.length}
                </div>
            </div>
            );
        }
        else info=(
            <div></div>
        );


        return(
            <div className ="teacher-container">
                <div className="group-container">
                    <div className="groupList"  >
                        <this.GroupList userGroups={this.props}/>
                    </div>
                    <div className="groupInfo" style={{clear:"both"}}>
                        {info}
                    {/* <this.GroupInfo list={null}id={null}/> */}
                    </div>
                </div>
            </div>
           
        );

    }
}


export default Teacher;