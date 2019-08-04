import React, { Component } from 'react';
import AddressForm from './AddressForm/AddressForm';
import AddressCard from './AddressCard/AddressCard';
import SpellCard from './SpellCard/SpellCard';
import SpellForm from './SpellForm/SpellForm';

import axios from 'axios';
import './App.css';

class App extends Component{
    constructor(props) {
        super(props);
       this.state = {
            spellform: {
                spellName: '',
            },
            title: 'List of Spells',

            spellsName: [],
            spellsDesc:[],
            spellsLevel:[]

        };
    }
    componentDidMount() {
        var allespreuken = [];
            //Get request using Axios package
                for(var i = 1; i < 320; i++) {
                    axios.get('http://www.dnd5eapi.co/api/spells')
                        .then(response => { //Promise executed when data is sent back
                            //Set the data in the state
                            this.setState({spellsName: response.data.results});
                        });
                    axios.get('http://www.dnd5eapi.co/api/spells/'+i)
                        .then(response => {
                           allespreuken.push(response.data);

                        });

                }

                this.setState({spellsDesc:allespreuken});


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

  addToLocalStorage = (event) =>{
      event.preventDefault();
  }

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
      let spllsName = this.state.spellsName.map((spellName) => {
          return <SpellCard
          name = {spellName.name}
          />
  });


      var arr = [];

      for (var spell in this.state.spellsDesc) {
          arr.push(this.state.spellsDesc[spell]);
      }

      let spells = arr.map((spell) => {
          return <SpellCard
              name = {spell.name}
              level = {spell.level}
          />
      });



      /*
      Object.keys(myObject).map((key, index) => {
          const myItem = myObject[key]
          return <MyComponent myItem={myItem} key={index} />
      })*/

      return (
          <div className="App">
             <h1>{this.state.title}</h1>
              <SpellForm>
                  spellName = {this.state.spellform.spellName}
                  change = {this.changeInputHandler}
                  submit = {this.addToLocalStorage}
              </SpellForm>
              {spells}
          </div>
      );
  }

}

export default App;
