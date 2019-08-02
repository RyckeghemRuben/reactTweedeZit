import React from 'react';
import './AddressCard.css';

const addressCard = (props) => {
    return(
        <div className="card">
        <h3>Address of {props.name}</h3>
            <p>Student at ehb</p>
            <p>Lives in {props.city}</p>
        </div>
    );
}

export default addressCard;