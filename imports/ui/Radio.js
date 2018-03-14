import React, { Component } from 'react';

export default class Radio extends Component{
    render(){
        return(
            
              <div >
                <label>
                  <input type="radio" name={this.props.name} value="Female"  checked={this.props.default === 'Female'}  onChange={this.props.updateRadioProp} />
                  Female
                </label>
              
                <label>
                  <input type="radio" name={this.props.name} value="Male"   defaultChecked={this.props.default === 'Male'} onChange={this.props.updateRadioProp} />
                  Male
                </label>
              </div>
            
        );
    }
}