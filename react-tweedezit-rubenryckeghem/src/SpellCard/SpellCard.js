import React from 'react'
import './SpellCard.css';

const spellCard = (props) => {

    return(
        <div className="card" key={props.id}>
            Dit is spreuk: {props.name}<br/>
            Level: {props.level}<br/>
            <button type="submit" value = {props.index} onClick={props.click}> add to book </button>
        </div>
    );
}
export default spellCard;
