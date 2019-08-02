import React, { Component } from 'react';
import AddressForm from './AddressForm/AddressForm';
import AddressCard from './AddressCard/AddressCard';

import './App.css';

class App extends Component{
  state = {
      list: [
          {name:'Ruben', city:'Likert'},
          {name:'Jergo', city:'Oilsjt'},
          {name:'Ruud', city:'Antwerpen'}
      ],
      form: {
          name:'',
          city:''
      },

      title:'Personal Address'


  };

  changeAdrTypeHandler = (type) =>{
          this.setState({
              title: type
          });

  };
  changeInputHandler = (event) =>{

          let newForm = Object.assign({},this.state.form);
          newForm[event.target.name] = event.target.value;
      this.setState({
          form: newForm
      });
    };

  submitHandler = (event) =>{
    event.preventDefault();
    let newState = Object.assign({},this.state);
    newState.list[0].name = newState.form.name;
    newState.list[0].city = newState.form.city;

    newState.form.name ='';
    newState.form.city ='';

    this.setState(newState);

  }

  render(){

      return (
          <div className="App">
            <h1>Welcome</h1>
            <p>Testparagraaf</p>
            <hr/>
            <button onClick={
              () => this.changeAdrTypeHandler('Business Address')
            }>Business Address</button>
              <button onClick={
              () => this.changeAdrTypeHandler('Personal Address')
            }>Personal Address Type</button>
              <AddressForm
                  name={this.state.form.name}
                  city = {this.state.form.city}
                  change = {this.changeInputHandler}
                  submit = {this.submitHandler}>
                  {this.state.title}
              </AddressForm>


            <AddressCard
                name = {this.state.list[0].name}
                city = {this.state.list[0].city}
            />
              <AddressCard
                  name = {this.state.list[1].name}
                  city = {this.state.list[1].city}
              />
              <AddressCard
                  name = {this.state.list[2].name}
                  city = {this.state.list[2].city}
              />
          </div>
      );
  }

}

export default App;
