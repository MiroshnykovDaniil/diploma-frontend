import React, { Component } from 'react';


class Button extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            text:props.text,
            onClick:props.onClick,
            disabled : this.props.disabled || false
        }    
    }



    render(){
        return (
            <button onClick={this.state.onClick} disabled={this.state.disabled}>
              {this.state.text}
            </button>
        );
    }

}



    
export default Button;