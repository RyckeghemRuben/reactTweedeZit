import React from 'react'
import './SpellCard.css';

const spellCard = (props) => {

    return(
        <div className="card">
            Dit is spreuk: {props.name}<br/>
            Level: {props.level}<br/>
            <button type="submit"> add to book </button>
        </div>
    );
}
export default spellCard;
