import React, { Component } from 'react';

import SpellCard from './SpellCard/SpellCard';
import SpellForm from './SpellForm/SpellForm';
import SpellBookCard from './SpellBookCard/SpellBookCard';
import UniqueId from 'react-html-id';
import thrash from './thrash.jpg';
import vinkje from './vinkje.png';
import plusKnop from './plusKnop.png';
import axios from 'axios';
import './App.css';

//search via tutorial youtube
//button laten veranderen, gebaseerd op deze stackoverflow: https://stackoverflow.com/questions/48615887/how-can-i-change-the-fontweight-of-an-item-at-click-method-react

function searchingFor(term) {
    return function (x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}


class App extends Component{
    constructor(props) {

        super(props);
        UniqueId.enableUniqueIds(this);
       this.state = {
            spellform: {
                spellName: '',
            },
            title: 'LIST OF SPELLS',
            titleBook: 'SPELLBOOK',
            spelssName: [],
            spells:[],
            term: '',
            retrievedSpells:[],
            selected: [],
           spellsIndex:[]
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

  addToLocalStorage = (index,event ) =>{
        if(this.state.spellsIndex.includes(index)){
            console.log(window.alert("You've already added this spell"))
        }else {
            event.preventDefault();
            var spellsArray = this.state.spells;
            var spell = spellsArray.find(function (element) {
                return element.index === index;
            })

            this.state.spellsIndex.push(spell.index);
            console.log("spellindex: " + this.state.spellsIndex)

            localStorage.setItem('Spell', JSON.stringify(spell));
            console.log(spell);
            console.log(index);


            this.retrieveFromLocalStorage();

        }
  }


  retrieveFromLocalStorage(){
        var retrievedSpell = localStorage.getItem('Spell');
        var retrievedSpelArray = Object.assign([], this.state.retrievedSpells);
        retrievedSpelArray.push(JSON.parse(retrievedSpell));
        this.setState({retrievedSpells:retrievedSpelArray});
        console.log("spellsindex = " + this.state.spellsIndex)
        //this.state.retrievedSpells.push(JSON.parse(retrievedSpell));
        console.log(this.state.retrievedSpells);

  }

  deleteSpell = (index) =>{

        const copyRetrievedSpells = Object.assign([],this.state.retrievedSpells);
        copyRetrievedSpells.splice(index,1);
        this.setState({retrievedSpells : copyRetrievedSpells});
        localStorage.removeItem('Spell');
        var spellsindex = Object.assign([], this.state.spellsIndex);
        spellsindex.splice(index,1);
        this.setState({spellsIndex:spellsindex});
        console.log(this.state.retrievedSpells);
      console.log("spellsindex = " + this.state.spellsIndex)


  }



  render(){

      var arr = [];

      for (var spell in this.state.spells) {
          arr.push(this.state.spells[spell]);
      }

      let spells = arr.filter(searchingFor(this.state.term)).map((spell) => {
          if(this.state.spellsIndex.includes(spell.index)) {
              return <SpellCard key={spell.index}
                                id={spell.index}
                                name={spell.name}
                                level={spell.level}
                                index={spell.index}
                                imageKnop={vinkje}
                                click={this.addToLocalStorage.bind(this, spell.index)}
              />
          }else{
              return <SpellCard key={spell.index}
                                id={spell.index}
                                name={spell.name}
                                level={spell.level}
                                index={spell.index}
                                imageKnop={plusKnop}
                                click={this.addToLocalStorage.bind(this, spell.index)}
              />


          }

      });

      let retrievedSpells = this.state.retrievedSpells.map((retrievedSpell, index, item) => {
          return <SpellBookCard key = {retrievedSpell.index}
                name = {retrievedSpell.name}
                desc = {retrievedSpell.desc}
                range = {retrievedSpell.range}
                level = {retrievedSpell.level}
                duration ={retrievedSpell.duration}
                image = {thrash}
                concentration = {retrievedSpell.concentration}
                deleteSpell = {this.deleteSpell.bind(this,index, item)}

              />


      })  ;


      return (
          <div className="App">
              <div className="row">
              <div className="col-6">
             <h1>{this.state.title}</h1>
              <SpellForm
                  change = {this.searchHandler}
                  value = {this.state.term}
              />
              {spells}
              </div>
                  <div className = "col-6">
                      <h1>{this.state.titleBook}</h1>
                      {retrievedSpells}
                  </div>
              </div>
          </div>
      );
  }

}

export default App;
