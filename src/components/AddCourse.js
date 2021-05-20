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

import { addCourse } from '../util/APIUtils';
import Toast from 'react-bootstrap/Toast';

 import './AddInfoToLesson.css';
import FormCheck from 'react-bootstrap/esm/FormCheck';

class Container extends Component {

    constructor(){
        super()
       // this.openModal=this.openModal.bind(this);
       this.state={
        title: null, showList:false, show:true,
        description:"",
       }
    }

    componentDidMount(){
    }

    handleTitleChange(e){
        this.setState({
            title:e.target.value
        },()=>{
        })

    }

    handleDescChange(e){
        this.setState({
            description:e.target.value
        },()=>{
        })

    }

    save(){
        if (this.state.title != null){
            addCourse(this.state.title,this.state.description).then(
                this.props.closeModal,
                this.toasts())
        }

    }



    render(){
      return(
        <Modal 
        dialogClassName="addInfo-modal"
          show={this.props.isOpen} 
          onHide={this.props.closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>Додання курсу</Modal.Title>
         <Form.Group>
          </Form.Group>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label>Назва: </Form.Label>
                <Form.Control type="text" onChange={this.handleTitleChange.bind(this)} value={this.state.title} placeholder="Введите назву"/>           
                <Form.Label>Опис: </Form.Label>
                <Form.Control type="textarea" onChange={this.handleDescChange.bind(this)} value={this.state.description} placeholder="Введите опис"/>           
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.save.bind(this)}>Зберігти</Button>
            {/* {this.toasts()} */}
        </Modal.Footer>
      </Modal>
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
                    <strong md={4}>Уведомление‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‎</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Добавление виконано успішно!
                    </Toast.Body>
                </Toast>
            );
                   
        return(
            <div>
                {toasts}
            </div>
        )
    }

  
}
export default Container;