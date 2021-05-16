import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import './Teacher.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
//import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonBoot from 'react-bootstrap/Button'

import SearchForm from '../../components/AddUserToGroup';

class Teacher extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            group:null,
            openModel: false,
            addToGroup:null

        }
        this.GroupList=this.GroupList.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.openModal=this.openModal.bind(this);

    } 
  //  openModal = (id) => this.setState({ openModel: true,addToGroupId:id }); 
    
    openModal(group){
        this.setState({openModel:true,addToGroup:group})
    }
    closeModal(){
        this.setState({openModel:false})
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

    UserRoles(member){
        const list=[];

        for(let roles of member.roles){
            switch(roles){
                case "USER": {
                    list.push(
                        <Col>
                            <Row>USER</Row>
                        </Col>
                    );break;
                }
                case "TEACHER": {
                    list.push(
                        <Col>TEACHER</Col>
                    );break;
                }
                case "ADMIN": {
                    list.push(
                        <Col>ADMIN</Col>
                    );break;
                }
            }
        }
        if (!member.roles.includes("ADMIN")&&!member.roles.includes("TEACHER"))
            list.push(
                <Col><ButtonBoot>DELETE</ButtonBoot></Col>
            );

        return(
            <Row>
                {list}
            </Row>
        )
    }

    UserList(group){
        if (typeof group == 'undefined')return;
        const list = [];

        for(let member of group.members){
            list.push(
                <ListGroup.Item>
                    <Row>
                    <div className="profile-avatar">
                            { 
                                member.imageUrl ? (
                                    <img src={member.imageUrl} alt={member.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        {member.name && member.name[0]}
                                    </div>
                                )
                            }
                        </div>
                    </Row>
                    <Row>{member.name}</Row>
                    <Row>{this.UserRoles(member)}</Row>
                </ListGroup.Item>
            )
        }
        return(
            <ListGroup>
                {list}
            </ListGroup>
        );
    }
    

    GroupList(props){
        const list=props.userGroups;
        if (list.userGroups==null)
        return (<Redirect to ="teacher"></Redirect>);
       const list2 = [];
       for(let data of list.userGroups){
           list2.push(
               <div className = "groups-cards">
                   <ListGroup.Item
                   md={4}
                   action href={"#group="+data.id}
                   >
                       {data.title}
                   </ListGroup.Item>
               </div>
           )
       }

       const groupInfo =[]
       for(let data of list.userGroups){
        groupInfo.push(
                <Tab.Pane
                eventKey={"#group="+data.id}
                >
                    <Row>
                        <Col>Название</Col>
                    </Row>
                    <Row>
                        <Col>{data.title}</Col>
                    </Row>
                    <Row>
                        <Col>Учасники групы</Col>
                    </Row>
                    <Row>
                      {this.UserList(data)}
                    </Row>
                    <Row>
                        <ButtonBoot onClick={()=>this.openModal(data)}></ButtonBoot>
                    </Row>
                </Tab.Pane>
        )
    }


        // const grouplist=list.userGroups.map((group)=>

        // <tr key={group.id}>
        //     <td>{group.title}</td>
        //     <td>{group.members.length}</td>
        //     <td>
        //         <Button text="Inspect" 
        //         onClick= {()=>this.setState({group:group})}
        //         ></Button>
        //     </td>
        // </tr>
        // );

        return(
            <Tab.Container>
                <Row className="justify-content-md-center">
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <ListGroup>
                            <div>Название группы</div>
                            {list2}
                        </ListGroup>
                    </Col>
                    <Col sm={7}>
                        <Tab.Content>     
                                <div>Поднобности</div>
                                {groupInfo}
                        </Tab.Content>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                <Row>
                    { this.state.openModel ? 
                    <SearchForm 
                    closeModal={this.closeModal} 
                    isOpen={this.state.openModel} 
                    handleSubmit={this.handleSubmit}
                    group={this.state.addToGroup}
                    /> 
                    : 
                    null 
                    }

                </Row>
            </Tab.Container>
            // <table>
            //     <thead>
            //         <tr>
            //             <th>Group title</th>
            //             <th>Count of members</th>
            //             <th>Inspect</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {grouplist}
            //     </tbody>
            // </table>
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
                        <this.GroupList userGroups={this.props}/>
                </div>
            </div>
           
        );

    }
}


export default Teacher;