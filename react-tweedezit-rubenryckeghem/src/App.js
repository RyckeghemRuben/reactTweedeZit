import React, { Component } from 'react';

import SpellCard from './SpellCard/SpellCard';
import SpellForm from './SpellForm/SpellForm';
import SpellBookCard from './SpellBookCard/SpellBookCard';


import axios from 'axios';
import './App.css';

function searchingFor(term) {
    return function (x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class App extends Component{
    constructor(props) {
        super(props);
       this.state = {
            spellform: {
                spellName: '',
            },
            title: 'List of Spells',
            titleBook: 'Spellbook',
            spelssName: [],
            spells:[],
            term: '',

           retrievedSpells:[]

        };

       this.searchHandler = this.searchHandler.bind(this);
       this.addToLocalStorage = this.addToLocalStorage.bind(this);
    }
    componentDidMount() {
        var allespreuken = [];
                for(var i = 1; i < 320; i++) {
                    axios.get('http://www.dnd5eapi.co/api/spells')
                        .then(response => {
                            this.setState({spellsName: response.data.results});
                        });
                    axios.get('http://www.dnd5eapi.co/api/spells/'+i)
                        .then(response => {
                           allespreuken.push(response.data);

                        });

                }

                this.setState({spells:allespreuken});
    }


    searchHandler = event=>{
        this.setState({term: event.target.value});
    }

  addToLocalStorage = (index, event) =>{
      event.preventDefault();

      var spellsArray = this.state.spells;
      var spell = spellsArray.find(function (element) {
          return element.index === index;
      })


      localStorage.setItem('Spell', JSON.stringify(spell));
      console.log(spell);
      console.log(index);

      this.retrieveFromLocalStorage();
  }


  retrieveFromLocalStorage(){
        var retrievedSpell = localStorage.getItem('Spell');
        console.log('Spell: ', retrievedSpell);
        this.state.retrievedSpells.push(JSON.parse(retrievedSpell));

  }



  render(){


      var arr = [];

      for (var spell in this.state.spells) {
          arr.push(this.state.spells[spell]);
      }

      let spells = arr.filter(searchingFor(this.state.term)).map((spell) => {
          return <SpellCard key = {spell.index}
              id = {spell.index}
              name = {spell.name}
              level = {spell.level}
              index = {spell.index}
              click = {this.addToLocalStorage.bind(this,spell.index)}
          />


      });
      let retrievedSpells = this.state.retrievedSpells.map((retrievedSpell) => {
          return <SpellBookCard key = {retrievedSpell.index}
                name = {retrievedSpell.name}
                desc = {retrievedSpell.desc}
              />


      })  ;


      return (
          <div className="App">

              <h1>{this.state.titleBook}</h1>
              {retrievedSpells}
             <h1>{this.state.title}</h1>


              <SpellForm
                  change = {this.searchHandler}
                  value = {this.state.term}
              />

              {spells}
          </div>
      );
  }

}

export default App;
