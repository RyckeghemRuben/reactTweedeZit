import React from 'react'
import './SpellBookCard.css';
const SpellBookCard = (props) => {

    return(
        <div className="spellbookcard">
            Dit is spreuk: {props.name}<br/>
            Beschrijving: {props.desc}<br/>
        </div>
    );
}
export default SpellBookCard;
