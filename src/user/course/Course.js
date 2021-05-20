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
import AddInfoForm from '../../components/AddInfoToLesson';
import AddLesson from '../../components/AddLesson';
import AddCourse from '../../components/AddCourse';
import AddCourseToGroup from '../../components/AddCourseToGroup';
import AddGroup from '../../components/AddGroup';



import { deleteUsersFromGroup, getAuthorCourses, getPdf, getVideo, deleteGroup } from '../../util/APIUtils';

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

import ReactPlayer from 'react-player'


class Courses extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            group:null,
            openModel: false,
            addToGroup:null,
            reload:false,

            courses:null,
            pdf:null,
            youTube:null,

            video:null,

            addInfo:false,
            addToLesson:null,

            addLesson:null,
            addToCourse:null,

            addCourse:null,

            openCourseModel:null,
            addGroup:null

        }
        this.GroupList=this.GroupList.bind(this);
        this.CoursesList=this.CoursesList.bind(this);

        this.closeModal=this.closeModal.bind(this);
        this.openModal=this.openModal.bind(this);
        this.updateUserState=this.updateUserState.bind(this);

        this.getAuthorCourses = this.getAuthorCourses.bind(this);
        this.lessonDataList = this.lessonDataList.bind(this);
        this.watchPdf = this.watchPdf.bind(this);
        this.watchLessonData = this.watchLessonData.bind(this);
        this.watchYouTubeVideo = this.watchYouTubeVideo.bind(this);
        this.ifPdf = this.ifPdf.bind(this);
        this.ifVideo = this.ifVideo.bind(this);
    
        this.watchVideo = this.watchVideo.bind(this);

        
        
        this.addCourseData=this.addCourseData.bind(this);
        this.endAddCourseData=this.endAddCourseData.bind(this);

        this.addLesson=this.addLesson.bind(this);
        this.endAddLesson=this.endAddLesson.bind(this);

        this.addCourse=this.addCourse.bind(this);
        this.endAddCourse=this.endAddCourse.bind(this);

        this.closeCourseModal=this.closeCourseModal.bind(this);
        this.openCourseModal=this.openCourseModal.bind(this);

        this.addGroup=this.addGroup.bind(this);
        this.endAddGroup=this.endAddGroup.bind(this);

        this.deleteGroup=this.deleteGroup.bind(this);
    } 
    
    openModal(group){
        this.setState({openModel:true,addToGroup:group})
    }
    closeModal(){
        this.setState({openModel:false},()=>{this.updateUserState()})
    }

    openCourseModal(group){
        this.setState({openCourseModel:true,addToGroup:group})
    }
    closeCourseModal(){
        this.setState({openCourseModel:false},()=>{this.updateUserState()})
    }

    addCourseData(lesson){
        this.setState({addInfo:true,addToLesson:lesson})
    }
    endAddCourseData(){
        this.setState({addInfo:false},()=>{this.getAuthorCourses()})
    }

    addLesson(course){
        this.setState({addLesson:true,addToCourse:course})
    }
    endAddLesson(){
        this.setState({addLesson:false},()=>{this.getAuthorCourses()})
    }

    addCourse(){
        this.setState({addCourse:true})
    }
    endAddCourse(){
        this.setState({addCourse:false},()=>{this.getAuthorCourses()})
    }

    addGroup(){
        this.setState({addGroup:true})
    }
    endAddGroup(){
        this.setState({addGroup:false},()=>{this.getAuthorCourses()})
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


    CourseList(group){
        if (typeof group == 'undefined')return;
        const list = [];

        for(let course of group.assignedCourses){
            list.push(
                <Accordion>
                    <Card>
                    <Card.Header>
                    <Accordion.Toggle as={ButtonBoot} variant="link" eventKey={course.title}>
                                {course.title}
                    </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey={course.title}>
                        
                    <Card.Body>
                        <Card.Text>Курс створив: {course.creator.name}</Card.Text>
                        <Accordion>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={ButtonBoot} variant="link" eventKey="1">
                                    Опис курсу
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {course.description}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion>
                            <Card className="author-lessons">
                            <Card.Header >
                                <Accordion.Toggle as={ButtonBoot} variant="link" eventKey={course.id}>
                                Список уроків
                                </Accordion.Toggle>
                            </Card.Header>
                        <Accordion.Collapse eventKey={course.id}>
                            <Card.Body>
                            <Row>
                            {this.lessonList(course)}
                            </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>

                    </Card.Body>


                    </Accordion.Collapse>

                </Card>

                </Accordion>
            )
        }
        return(
            <ListGroup>
                {list}
            </ListGroup>
        );
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
        return (<Redirect to ="courses"></Redirect>);
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
                    <Accordion>
                        <Card className="group-courses">
                            <Card.Header>
                                <Accordion.Toggle as={ButtonBoot} variant="link" eventKey="1">
                                    КУРСИ ГРУПИ
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>

                                    <Row>
                                        {this.CourseList(data)}
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Tab.Pane>
        )
    }

        return(
            <Tab.Container>
                <Row className="justify-content-md-center">
                    <Col sm={4}>
                        <ListGroup>
                            <strong>Список груп</strong>
                            {list2}
                        </ListGroup>
                    </Col>
                    <Col sm={7}>
                        <Tab.Content>     
                                {groupInfo}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            )
    }

    deleteGroup(group){
        deleteGroup(group.id).then(
            this.updateUserState()
        );
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
        return (<Redirect to ="courses"></Redirect>);
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
                            <Row>
                                { this.state.addCourse ? 
                                <AddCourse updateUserState = {this.updateUserState}
                                closeModal={this.endAddCourse} 
                                isOpen={this.state.addCourse} 
                                /> 
                                : 
                                null 
                                }

                            </Row>
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

    watchVideo(){
        if (this.state.video === null)return;
        // let file = this._arrayBufferToBase64(this.state.pdf);
        const file = new Blob([this.state.video], {type: 'video/mp4'});
        if(file===null) return;
        const blobURL = URL.createObjectURL(file);
        window.open(blobURL)
    }

    watchPdf(){
        if (this.state.pdf === null)return;
        // let file = this._arrayBufferToBase64(this.state.pdf);
        const file = new Blob([this.state.pdf], {type: 'application/pdf'});
        if(file===null) return;
        const blobURL = URL.createObjectURL(file);
        window.open(blobURL)
    //   const [numPages, setNumPages] = React.useState(null);
    //   const [pageNumber, setPageNumber] = React.useState(1);
    //   function onDocumentLoadSuccess({ numPages }) {
    //     setNumPages(numPages);
    //   }
        

    //     return(
    //         <div>
    //         <Document file={this.state.pdf} onLoadSuccess={({ numPages })=>setNumPages(numPages)}>
    //             {Array.apply(null, Array(numPages))
    //         .map((x, i)=>i+1)
    //         .map(page => <Page pageNumber={page}/>)}

    //         </Document>
    //         </div>
    //     )
    }

    _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }


        // return window.btoa( binary );
    }
    
    watchYouTubeVideo(data){
        if(data.data===undefined||data.data===null){return(<div></div>)}
        else return(
            <Row>
                <ReactPlayer url={data.data} />
            </Row>
        )
    }

    watchLessonData(data){
            switch(data.dataType){
            case "PDF":{
                let blob
                getPdf(data.id)
                .then( (response) =>{
                    this.setState({
                        pdf:response
                    },()=>{this.watchPdf()})
                })
            }
            case "video":{
                if(data.youtubeLink!=null){
                    this.setState({youtubeLink:data.youtubeLink})
                    }    
                else if(data.path!=null){
                    getVideo(data.id)
                    .then( (response) =>{
                        this.setState({
                            video:response
                        },()=>{this.watchVideo()})
                    })
                    }
                }
            
        }
        return

    }

    ifPdf(data){
        if(data.dataType==="PDF") return(
            <ButtonBoot variant="outline-primary" onClick={()=>this.watchLessonData(data)}>Переглянути</ButtonBoot>
        )
        else return(<div></div>)
    }

    ifVideo(data){
        if(data.dataType==="video"&&data.path!=null) return(
            <ButtonBoot variant="outline-primary" onClick={()=>this.watchLessonData(data)}>Переглянути</ButtonBoot>
        )
        else return(<div></div>)
    }

    lessonDataList(lesson){
        let lessonDataList=[];

        for(let data of lesson.lessonData){
            lessonDataList.push(
                <Accordion>
                
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={ButtonBoot} variant="link" eventKey={data.id}>
                            {data.title}
                        </Accordion.Toggle>
                    </Card.Header>
                <Card.Body>
                    <Accordion.Collapse eventKey={data.id}>
                    <Card.Text>
                        <Row>{data.description}</Row>
                        <Row>
                            <this.watchYouTubeVideo data={data.youtubeLink}/>
                            {/* <this.watchVideoLocal id={data.id}/> */}
                            <this.ifVideo dataType={data.dataType} id={data.id} path={data.path}/>
                            <this.ifPdf dataType={data.dataType} id={data.id}/>
                        </Row>
                    </Card.Text>
                    </Accordion.Collapse>
                </Card.Body>
                    </Card>
                </Accordion>


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

        return(
            // <div className ="teacher-container">
                        <div className="group-container">
                            <this.GroupList userGroups={this.props}/>
                        </div>

            // </div>
           
        );

    }
}


export default Courses;