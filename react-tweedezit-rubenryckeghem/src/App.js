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
            selected: null

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

  addToLocalStorage = (index,item,event ) =>{
      event.preventDefault();
      var spellsArray = this.state.spells;
      var spell = spellsArray.find(function (element) {
      return element.index === index;
      })
      
      this.setState({
          selected: item
      })


      localStorage.setItem('Spell', JSON.stringify(spell));
      console.log(spell);
      console.log(index);

      this.retrieveFromLocalStorage();


  }


  retrieveFromLocalStorage(){
        var retrievedSpell = localStorage.getItem('Spell');
        var retrievedSpelArray = Object.assign([], this.state.retrievedSpells);
        retrievedSpelArray.push(JSON.parse(retrievedSpell));
        this.setState({retrievedSpells:retrievedSpelArray});
        //this.state.retrievedSpells.push(JSON.parse(retrievedSpell));
        console.log(this.state.retrievedSpells);

  }

  deleteSpell = (index, item) =>{

        const copyRetrievedSpells = Object.assign([],this.state.retrievedSpells);
        copyRetrievedSpells.splice(index,1);
        this.setState({retrievedSpells : copyRetrievedSpells});
        localStorage.removeItem('Spell');
         this.setState({
          selected: item
        })
        console.log(this.state.retrievedSpells);

  }



  render(){

      var arr = [];

      for (var spell in this.state.spells) {
          arr.push(this.state.spells[spell]);
      }


      let spells = arr.filter(searchingFor(this.state.term)).map((spell, item) => {

          return <SpellCard key = {spell.index}
              id = {spell.index}
              name = {spell.name}
              level = {spell.level}
              index = {spell.index}
              imageKnop = {this.state.selected === item ? vinkje : plusKnop}
              enableDisable = {this.state.selected === item ? 'disabled' : 'cardButton'}
              enableDisableDiv = {this.state.selected === item ? 'disabled' : ''}
              click = {this.addToLocalStorage.bind(this,spell.index, item)}
          />


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
