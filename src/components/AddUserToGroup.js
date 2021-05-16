import React, { Component, useState  } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'
//import './Teacher.css'

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

import { getAllUsers } from '../util/APIUtils';


class Container extends Component {

    constructor(){
        super()
       // this.openModal=this.openModal.bind(this);
       this.state={
        name: null, users:null,group:null
       }
    }


    componentDidMount(){
        this.setState({group:this.props.group});

        getAllUsers()
        .then(response =>{
          this.setState({
            users: response
          });
        })

    }
//this.state.group.members.includes(el))
    removeUsers(){
        this.setState({
            users: 
                this.state.users.forEach(function(item,index,object) {
                    this.state.group.members.forEach(el => {
                        if (item.id === el.id) 
                            object.splice(index,1);
                    });
                })
            })
    }
    
    handleChange(e){
        this.removeUsers()
        this.setState({name: e.target.value})



    }


    render(){
      return(
        <Modal 
          show={this.props.isOpen} 
          onHide={this.props.closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>Modal Form Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group >
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" onChange={this.handleChange.bind(this)} value={this.state.name} placeholder="name input"/>           
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit" onClick={() => this.props.handleSubmit(this.state.name)}>
                Submit
            </Button>
        </Modal.Footer>
      </Modal>
      )
    }
  
}
export default Container;