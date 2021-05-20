import React, { Component, useState  } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'

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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

import { getGroup, addAssignedCourse, getAllCourses } from '../util/APIUtils';
import Toast from 'react-bootstrap/Toast';

 import './AddUserToGroup.css';

class Container extends Component {

    constructor(){
        super()
       // this.openModal=this.openModal.bind(this);
       this.state={
        name: null, courses:null,group:null, showList:false, show:true
       }
    }


    componentDidMount(){
        this.setState({group:this.props.group});

        getAllCourses()
        .then(response =>{
          this.setState({
            courses: response
          });
        })

    }
//this.state.group.members.includes(el))
    removeCourses(){
        let data = this.state.courses;
        if(this.state.group===null||data===null)return;
        let parametersA = this.state.group.assignedCourses;
        let parametersB = this.state.group.completedCourses;

        var i,j;
        for(i=0; i<data.length;i++){
            for(j=0;j<parametersA.length;j++){
                if(data[i].id===parametersA[j].id){
                    data.splice(i,1);
                    i=0; j=0;
                }
            }
        }

        for(i=0; i<data.length;i++){
            for(j=0;j<parametersB.length;j++){
                if(data[i].id===parametersB[j].id){
                    data.splice(i,1);
                    i=0; j=0;
                }
            }
        }

        this.setState({
            courses: data,
            showList:true,
                
                // this.state.users.forEach(function(item,index,object) {
                //     this.state.group.members.forEach(el => {
                //         if (item.id === el.id) 
                //             object.splice(index,1);
                //     });
                // })
            },()=>{
                //this.searchResults();   
            })

    }
    
    handleChange(e){
        this.setState({
            name:e.target.value
        },()=>{
            this.removeCourses()
        })

    }

    addCourse(e){
        addAssignedCourse(this.state.group.id,e.id).then(
            resp =>
            getGroup(this.state.group.id).then(
                response =>{
                    this.setState({
                        group: response
                    }
            )},
            this.props.closeModal,
            this.removeCourses(),
            this.searchResults(),
            )
        )
        return (
            this.setState({ toast:e  
            }),()=>{
                this.removeCourses();
                this.searchResults();
                this.toasts();
            }
        )
     
    }

    searchResults(){
        if (!this.state.showList) {this.removeCourses();return}

        let list=this.state.courses;
        let result=[];
        var i;
        result.push(
            <ListGroup horizontal className="ListGroup">
                <ListGroup.Item className="name" variant="primary">
                    Назва курсу
                </ListGroup.Item>
                <ListGroup.Item className="email" variant="primary">
                Опис курсу
                </ListGroup.Item>
                <ListGroup.Item className="roles" variant="primary">
                ФІО власника курсу
                </ListGroup.Item>
                <ListGroup.Item className="my-btn" variant="primary">
                Додати курс до групи
                </ListGroup.Item>
            </ListGroup>
        )


        for(i=0;i<list.length;i++){
             //   result.push(list[i]);
             result.push(
               <ListGroup horizontal className="ListGroup">
                    <ListGroup.Item className="name" variant="info">
                        {list[i].title}
                    </ListGroup.Item >
                    <ListGroup.Item className="email" variant="info">
                        {list[i].description}
                    </ListGroup.Item>
                    <ListGroup.Item className="roles" variant="info">
                        {list[i].creator.name}
                    </ListGroup.Item>
                    <ListGroup.Item className="my-btn" variant="info">
                        <Button onClick={this.addCourse.bind(this,list[i])}>Add</Button>
                    </ListGroup.Item>
               </ListGroup>

                
             )
            
        }
        return(
            <ListGroup className="search-list">
                {result}
            </ListGroup>
        )
        

    }

    closeToast(){
        return(
            this.setState({ toast:null  
            }),()=>{
                this.toasts();
            }    
        )
    }

    


    toasts(){
        let toasts=[];
        if(this.state.toast==null) {return}
        
        toasts.push(
                <Toast delay={10000} onClose={() => this.closeToast()} show={this.state.show}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                    <Toast.Header closeLabel=''>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong md={4}>Повідомлення ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‎</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Курс {this.state.toast.title} було додано!
                    </Toast.Body>
                </Toast>
            );
                   
        return(
            <div>
                {toasts}
            </div>
        )
    }


    render(){
      return(
        <Modal 
        dialogClassName="my-modal"
          show={this.props.isOpen} 
          onHide={this.props.closeModal
        }
        >
        <Modal.Header closeButton>
          <Modal.Title>Поиск</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                {this.searchResults()}
                {this.toasts()}
        </Modal.Body>
        <Modal.Footer>
            {/* {this.toasts()} */}
        </Modal.Footer>
      </Modal>
      )
    }
  
}
export default Container;