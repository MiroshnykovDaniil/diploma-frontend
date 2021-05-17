import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import './Teacher.css'

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';

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
import Accordion from 'react-bootstrap/Accordion'

import SearchForm from '../../components/AddUserToGroup';
import { deleteUsersFromGroup, getAuthorCourses, getPdf } from '../../util/APIUtils';

class Teacher extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            group:null,
            openModel: false,
            addToGroup:null,
            reload:false,

            courses:null,
            pdf:null

        }
        this.GroupList=this.GroupList.bind(this);
        this.CoursesList=this.CoursesList.bind(this);

        this.closeModal=this.closeModal.bind(this);
        this.openModal=this.openModal.bind(this);
        this.updateUserState=this.updateUserState.bind(this);

        this.getAuthorCourses = this.getAuthorCourses.bind(this);
        this.lessonDataList = this.lessonDataList.bind(this);
        this.watchPdf = this.watchPdf.bind(this);


    } 
  //  openModal = (id) => this.setState({ openModel: true,addToGroupId:id }); 
    
    openModal(group){
        this.setState({openModel:true,addToGroup:group})
    }
    closeModal(){
        this.setState({openModel:false},()=>{this.updateUserState()})
        
    }
    
    UserRoles(group,member){
        const list=[];
        list.push(
            <Col>
                <strong>РОЛІ:</strong>
            </Col>)
        for(let roles of member.roles){
            switch(roles){
                case "USER": {
                    list.push(
                            <Col className="user-col">
                            <Row>КОРИСТУВАЧ</Row>
                            </Col>
                    );break;
                }
                case "TEACHER": {
                    list.push(
                        <Col className="teacher-col">ВЧИТЕЛЬ</Col>
                    );break;
                }
                case "ADMIN": {
                    list.push(
                        <Col className="admin-col">АДМІНІСТРАТОР</Col>
                    );break;
                }
            }
        }
        if (!member.roles.includes("ADMIN")&&!member.roles.includes("TEACHER"))
            list.push(
                <Row><ButtonBoot variant="danger" onClick={()=>this.deleteMemeberFromGroup(group.id,member)}>ВИДАЛИТИ</ButtonBoot></Row>
            );

        return(
            <Row>
                {list}
            </Row>
        )
    }

    deleteMemeberFromGroup(groupId,user){
        deleteUsersFromGroup(groupId,user).then(
            this.updateUserState()
        )
    }

    updateUserState(){
        return (this.props.loadCurrentlyLoggedInUser())
    }

    UserList(group){
        if (typeof group == 'undefined')return;
        const list = [];

        for(let member of group.members){
            list.push(
                <Card>
                    <Card.Header>
                    <div className="profile-avatar">
                            { 
                                member.imageUrl ? (
                                    <Card.Img src={member.imageUrl} alt={member.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        {member.name && member.name[0]}
                                    </div>
                                )
                            }
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{member.name}</Card.Title>
                        <Card.Text>{this.UserRoles(group,member)}</Card.Text>
                    </Card.Body>
                </Card>
                // <ListGroup.Item>
                //     <Row>
                //     <div className="profile-avatar">
                //             { 
                //                 member.imageUrl ? (
                //                     <img src={member.imageUrl} alt={member.name}/>
                //                 ) : (
                //                     <div className="text-avatar">
                //                         {member.name && member.name[0]}
                //                     </div>
                //                 )
                //             }
                //         </div>
                //     </Row>
                //     <Row>{member.name}</Row>
                //     <Row>{this.UserRoles(group,member)}</Row>
                // </ListGroup.Item>
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
                    <Accordion>
                        <Card className="group-memebrs">
                            <Card.Header>
                                <Accordion.Toggle as={ButtonBoot} variant="link" eventKey="0">
                                    Учасники групы
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Row>
                                        {this.UserList(data)}
                                    </Row>
                                    <Row>
                                        <ButtonBoot onClick={()=>this.openModal(data)}>ДОДАТИ ДО ГРУПИ</ButtonBoot>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    {/* <Row>
                        <ButtonBoot onClick={()=>this.openModal(data)}></ButtonBoot>
                    </Row> */}
                </Tab.Pane>
        )
    }

        return(
            <Tab.Container>
                <Row className="justify-content-md-center">
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <ListGroup>
                            <strong>Название группы</strong>
                            {list2}
                        </ListGroup>
                    </Col>
                    <Col sm={7}>
                        <Tab.Content>     
                                <strong>Поднобности</strong>
                                {groupInfo}
                        </Tab.Content>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                <Row>
                    { this.state.openModel ? 
                    <SearchForm updateUserState = {this.updateUserState}
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
            )
    }

    getAuthorCourses(){
        getAuthorCourses()
        .then(response =>{
          this.setState({
            courses: response
          });
        })
    }

    CoursesList(){
        const list=this.state.courses;
        if (list==null)
        return (<Redirect to ="teacher"></Redirect>);
       const list2 = [];
       for(let data of list){
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

       const courseInfo =[]
       for(let data of list){
        courseInfo.push(
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
                        <Col>Описание</Col>
                    </Row>
                    <Row>
                        <Col>{data.description}</Col>
                    </Row>
                    <Row>
                        <Col>Уроки</Col>
                    </Row>
                    <Row>
                      {this.lessonList(data)}
                    </Row>
                    {/* <Row>
                      {this.UserList(data)}
                    </Row>
                    <Row>
                        <ButtonBoot onClick={()=>this.openModal(data)}></ButtonBoot>
                    </Row> */}
                </Tab.Pane>
        )
    }

        return(
            <Tab.Container>
                <Row className="justify-content-md-center">
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <ListGroup>
                            <strong>Название Курса</strong>
                            {list2}
                        </ListGroup>
                    </Col>
                    <Col sm={7}>
                        <Tab.Content>     
                                <strong>Поднобности</strong>
                                {courseInfo}
                        </Tab.Content>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
            </Tab.Container>
            )
    }

    watchPdf(){
        if (this.state.pdf === null)return;
        // let file = this._arrayBufferToBase64(this.state.pdf);
        const file = new Blob([this.state.pdf], {type: 'application/pdf'});
        if(file===null) return;
        const blobURL = URL.createObjectURL(file);
        window.open(blobURL)
    }

    _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    

    watchLessonData(data){
        switch(data.dataType){
            case "PDF":{
                getPdf(data.id)
                .then(response =>{
                  this.setState({
                    pdf: response
                  },()=>{this.watchPdf()});
                })
            
                break;
            }
            case "Video":{

            }
        }

    }

    lessonDataList(lesson){
        let lessonDataList=[];

        for(let data of lesson.lessonData){
            lessonDataList.push(
                <Card>
                    <Card.Header>
                        <div className="text-avatar">
                            {data.datatype}
                        </div>
                    </Card.Header>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                        <Row>{data.description}</Row>
                        <Row>
                            <Col>
                                <ButtonBoot onClick={()=>this.watchLessonData(data)}>Переглянути</ButtonBoot>
                            </Col>
                            <Col>
                                <ButtonBoot>Видалити</ButtonBoot>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>

            )
        }

        return(
            <ListGroup>
                {lessonDataList}
            </ListGroup>
        )
    }

    lessonList(course){
        if (typeof course == 'undefined')return;
        const list = [];

        for(let lesson of course.lessons){
            list.push(
                <Card className="author-lessons">
                    <Card.Header >
                        <Accordion.Toggle as={ButtonBoot} variant="link" eventKey={lesson.id}>
                            {lesson.title}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={lesson.id}>
                        <Card.Body>
                            <Row>
                            {lesson.description}
                            </Row>
                            <Row>
                            {this.lessonDataList(lesson)}
                            </Row>
                            <Row>
                                <ButtonBoot>Додати</ButtonBoot>
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }
        return(
            <Accordion>
                {list}
            </Accordion>
        );

    }



    componentDidMount(){
        this.getAuthorCourses()
    }

    render(){
        let info;

        // if(this.state.group!=null){
        //     info=(
        //         <div>
        //         <div>
        //             Title: {this.state.group.title}
        //         </div>
        //         <div>
        //             Members count: {this.state.group.members.length}
        //         </div>
        //     </div>
        //     );
        // }
        // else info=(
        //     <div></div>
        // );


        return(
            // <div className ="teacher-container">
                <Tabs className="teacher-container" defaultActiveKey="groups" id="teacher-menu-tab">
                    <Tab eventKey="groups" title="Групи">
                        <div className="group-container">
                            <this.GroupList userGroups={this.props}/>
                        </div>
                    </Tab>
                    <Tab eventKey="courses" title="Курси">
                            <this.CoursesList/>
                    </Tab>
                </Tabs>

            // </div>
           
        );

    }
}


export default Teacher;