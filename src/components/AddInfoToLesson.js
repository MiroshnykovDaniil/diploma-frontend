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

import { addPdf } from '../util/APIUtils';
import Toast from 'react-bootstrap/Toast';

 import './AddInfoToLesson.css';
import FormCheck from 'react-bootstrap/esm/FormCheck';

class Container extends Component {

    constructor(){
        super()
       // this.openModal=this.openModal.bind(this);
       this.state={
        title: null,lesson:null, showList:false, show:true,
        description:"",
        pdfFile:null, addPdfFile:false,
       }
    }

    componentDidMount(){
        this.setState({lesson:this.props.lesson});
    }

    addPdf(){
                this.setState({
            addPdfFile: true,},()=>{
                
            });
        }
    
    chooseFile(){

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

    handelChangePdf(e){
        let pdf = e.target.files[0];
        let res=null;
        var reader = new FileReader();
        reader.readAsArrayBuffer(pdf);
        reader.onload = function (){
            res = reader.result;
            console.log(reader.result);
            this.setState({
                pdfFile: reader.result,
            });
    
        }.bind(this)
        
    }

    save(){
        if (this.state.pdfFile!=null && this.state.title != null){
            addPdf(this.state.lesson.id,this.state.title,this.state.description,this.state.pdfFile).then(
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
          <Modal.Title>Додання матеріалу до уроку</Modal.Title>
         <Form.Group>
             <Row>
                 <Col>
                 <input id="upload" type="file" accept="application/pdf" onInput={this.handelChangePdf.bind(this)} ></input>
                 </Col>
                 <Col>           
                 <Button>Додати файл PDF</Button>
                 </Col>
                 <Col>
                 <Button>Додати відео з YouTube</Button>
                 </Col>
                 <Col>
                 <Button>Додати відео файл формату mp4</Button>
                 </Col>
             </Row>
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