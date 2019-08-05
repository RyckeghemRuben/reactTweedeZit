import React from 'react'
import './SpellBookCard.css';
const SpellBookCard = (props) => {

    return(
        <div className="spellbookcard" key={props.id}>
            <b>Dit is spreuk:</b> {props.name}<br/>
            <b>Beschrijving:</b> {props.desc}<br/>
            <b>Range:</b> {props.range}<br/>
            <b>Duration:</b> {props.duration}<br/>
            <b>Concentration:</b> {props.concentration}<br/>
            <button type="submit" key={props.id} onClick={props.deleteSpell}>delete</button>
        </div>
    );
}
export default SpellBookCard;
