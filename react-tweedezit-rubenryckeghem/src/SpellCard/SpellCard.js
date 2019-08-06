import React from 'react'
import './SpellCard.css';

const spellCard = (props) => {

    return(
        <div className="card" key={props.id}>
            <h5 className="card-header">{props.name}</h5>
            <div className="card-body">
                <h6 className="card-title">Level:{props.level}</h6>
                <div className={props.enableDisableDiv}>
                <img className="cardButton" src={props.imageKnop} type="submit" key={props.id} value = {props.index} onClick={props.click} />
            </div>
            </div>
        </div>
    );
}
export default spellCard;

