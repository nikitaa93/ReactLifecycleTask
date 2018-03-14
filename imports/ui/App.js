import React, { Component } from 'react';
import DropDownElement from './Drop';
import RadioElement from './Radio';
import propTypes from 'prop-types';
import Display from './dispComponent';
//import { validate} from './validate'
import data from './data.json';
import ErrorBoundary  from './ErrorBoundary';
//import est from './FetchData';

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          
          nameValue: '',
          contactValue: '',
          emailValue:'',
          countryValue:'',
          genderValue:'' ,
          nameError:'',
          contactError:'',
          emailError:'',
          nameReq:'',
          contactReq:'',
          emailReq:'',
          message : '',
          nameLength :''
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        console.log('---Will Mount--');
        let {nameValue}=this.state.nameValue;
        let name = event.target.name;
        let value =  event.target.value;
       this.validate(name,value);  
        console.log(nameValue);
        this.setState({
            nameValue    : data.Name,
            contactValue : data.Contact,
            emailValue   : data.Email,
            countryValue : data.Country,
            genderValue  : data.Gender,
            nameLength : data.Name.length

        })
        console.log(nameValue);

    }

    shouldComponentUpdate(){
        console.log('---Should Update--');
       
        //console.log('length of ',this.state.nameValue,' is : ',this.state.nameLength);
        
        if(this.state.nameLength  > 15){
            console.log('------Inside If ------');
            return false;
        }else{
            return true;
        }
        
    }
  
    handleChange(event) {
        let name = event.target.name;
        let value =  event.target.value;
       this.validate(name,value);       
    }

    
  
    handleSubmit(event) {   
        let { nameValue,contactValue,emailValue,countryValue,genderValue } = this.state;
        if (nameValue.trim().length<1) {
            console.log('Name require');
            this.setState({nameReq : 'Name is Required'}); 
        }else{
            this.setState({nameReq : '' }); 
            console.log('Name : ',nameValue);
        }
        if(contactValue.trim().length<1){
            this.setState({contactReq : 'Contact is Required'})
            console.log('Contact require');
        }else{
            console.log('Contact : ',contactValue);    
        }
        if(emailValue.trim().length<1){
            this.setState({emailReq : 'Email is Required'})
            console.log('Email require');
        }else{
            console.log('Email : ',emailValue);
        }
        console.log('Country : ',countryValue);
        console.log('Gender : ',genderValue);
        event.preventDefault();
    }

    validate(name,value){
        console.log('--validate');
        switch(name){
            case 'nameValue'  : {   //console.log((/^[a-zA-Z_\s]+$/).test(value))
                                    if((/^[a-zA-Z_\s]+$/).test(value)){   
                                        this.setState({ 
                                            nameValue: value, 
                                            nameError : ' ',
                                            nameLength : value.length,
                                            message : ''

                                        });
                                        console.log(name,value);
                                        nameLen = this.state.nameValue.length;
                                        


                                    }else if(value.trim().length>0){
                                       
                                        console.log('Name is invalid'); 
                                         
                                        this.setState({
                                            nameError : 'Name is invalid',
                                            nameReq : ' '});  
                                    }
                                    break;
                                    
            }

            case 'contactValue' : {
                                    if(value.match(/^[0-9]+$/)){
                                        this.setState({ 
                                            contactValue: value, 
                                            contactError : ''});
                                    }else if(value.trim().length>0){
                                        console.log('Contact is invalid');
                                        this.setState({
                                            contactError : 'Contact is invalid',
                                            contactReq : ''
                                        }) 
                                    }
                                }
                                break;
            
            case 'emailValue' :  {
                                    if(value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)){  
                                        this.setState({ 
                                            emailValue: value, 
                                            emailError : ''}); 
                                        
                                    }else if(value.length>1){

                                        console.log('Email is invalid');
                                        this.setState({
                                            emailError : 'Email is invalid',
                                            emailReq : ''
                                        }) 
                                    }
                                    break;
                                    
                                }
            default : this.setState({ [name]: value });
        }
    }
    
      
   
  
    render() {
        console.log('---- Render---');
        let { nameValue,contactValue,emailValue,countryValue,
            genderValue,nameError,contactError,emailError,
            nameReq,contactReq,emailReq,message } = this.state;
            
            
      return (
          
        <div >
            <h1>Enter your details</h1>
            
        
            <form  className='form-style-1' onSubmit={this.handleSubmit.bind(this)} >

                <label >Name :  
                    <ErrorBoundary>
                    <input type='text'  name = 'nameValue' defaultValue = {nameValue} onChange={this.handleChange}/>  
                    </ErrorBoundary>               
                </label>
                <br/>
                <label className='error'>
                    {nameError}
                    <br/>
                    {nameReq}</label>
                <br/>
                <label>Contact :
                    <input type='text' name ='contactValue'  defaultValue = {contactValue}  onChange={this.handleChange} />
                </label>
                <br/>
                <label className='error'>
                    {contactError}
                     {contactReq}</label>
                <br/>
                <label>Email :
                    <input type='text'  name='emailValue'  defaultValue = {emailValue} onChange={this.handleChange} />
                </label>
                <br/>
                <label className='error'>{emailError}{emailReq}</label>
                <br/>
                <br/>
                <label>Country :
                    <DropDownElement  name='countryValue' default = {countryValue} updateStateProp = {this.handleChange}/>
                </label>
                <br/>
                
                <RadioElement name='genderValue' default = {genderValue} updateRadioProp = {this.handleChange}/>  
                <br/>
                <input type='submit' value='Submit'  />
            </form>
            <Display name={nameValue} contact={contactValue} email={emailValue} country={countryValue} gender={genderValue} />
            <h1>
                
                {message}
                </h1>
            
            
        </div>
      );
    }
    

    componentDidUpdate() {
        console.log('---Did Update--');
        //console.log('length of ',this.state.nameValue,' is : ',this.state.nameLength);
        //let {nameValue}=this.state;
        // only update chart if the data has changed
        if (this.state.nameValue == data.Name && this.state.message != 'Success !' ) {
            
            
        
            console.log('success');
            this.setState({
                message : "Success !"});
            
           //suc = 'Success : '+this.state.nameValue
       
        
      }
    
    }
   
   
  }
