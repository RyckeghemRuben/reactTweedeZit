import React from 'react';
import './AddressCard.css';

const addressCard = (props) => {

    let classes = ['card'];
    if(props.zip >= 1000 && props.zip <= 1999){
        classes.push('brussel');
    }
    else if(props.zip >= 2000 && props.zip <= 2999){
        classes.push('antwerpen');
    }
    else if(props.zip >= 9000 && props.zip <= 9999){
        classes.push('gent');
    }
    else{
        classes.push('other');
    }

    if(props.name == "Flurk"){
        classes.push('user')
    }

    return(
        <div className={classes.join(' ')}>
        <h3>Address of {props.name}</h3>
            <p>Student at ehb</p>
            <p>Lives in {props.city}</p>
        </div>
    );
}

export default addressCard;