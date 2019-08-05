import React from 'react'
import './SpellBookCard.css';
const SpellBookCard = (props) => {

    return(
        <div className="spellbookcard">
            <b>Dit is spreuk:</b> {props.name}<br/>
            <b>Beschrijving:</b> {props.desc}<br/>
            <b>Range:</b> {props.range}<br/>
            <b>Duration:</b> {props.duration}<br/>
            <b>Concentration:</b> {props.concentration}<br/>
            <button type="submit">delete</button>
        </div>
    );
}
export default SpellBookCard;
