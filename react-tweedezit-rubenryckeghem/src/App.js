import React, { Component } from 'react';
import AddressForm from './AddressForm/AddressForm';
import AddressCard from './AddressCard/AddressCard';
import SpellCard from './SpellCard/SpellCard';
import axios from 'axios';
import './App.css';

class App extends Component{

  state = {
      list: [
          {name:'Ruben', city:'Brugge', zip: 3564},
          {name:'Jergo', city:'Brussel', zip: 1001},
          {name:'Ruud', city:'Gent',zip: 9800 },
          {name:'Berry', city:'Antwerpen',zip: 2020 },
          {name:'Flurk', city:'Antwerpen',zip: 2020 },
      ],
      form: {
          name:'',
          city:''
      },

      title:'Personal Address',

      spells: []


  };
    componentDidMount() {
            //Get request using Axios package
               axios.get('http://www.dnd5eapi.co/api/spells')
            .then(response => { //Promise executed when data is sent back
                //Set the data in the state
                this.setState({spells: response.data.results});
            });
    }

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

      let adrs = this.state.list.map(address => {
        return(
          <AddressCard
          name = {address.name}
          city = {address.city}
          zip = {address.zip}

          />
        );
      });

      const spells = this.state.spells.map((spell) => {
          return <SpellCard name = {spell.name} />
      });

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
              {adrs}

              {spells}

          </div>
      );
  }

}

export default App;
