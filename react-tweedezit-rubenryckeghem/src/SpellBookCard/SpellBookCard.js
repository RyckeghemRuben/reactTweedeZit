import React from 'react'
import './SpellBookCard.css';
const SpellBookCard = (props) => {

    return(

        <div className="card text-left" key={props.id}>
            <h5 className="card-header bg-info text-light">{props.name}</h5>
            <div className="card-body">
                <p className="card-text"><b>Description: </b>{props.desc}</p>
                <p className="card-text"><b>Level: </b>{props.level}</p>
                <p className="card-text"><b>Range: </b>{props.range}</p>
                <p className="card-text"><b>Duration: </b>{props.duration}</p>
                <p className="card-text"><b>Concentration: </b>{props.concentration}</p>
                <img className="spellbookButton" src={props.image} type="submit" key={props.id} onClick={props.deleteSpell}/>
            </div>
        </div>
    );
}
export default SpellBookCard;
