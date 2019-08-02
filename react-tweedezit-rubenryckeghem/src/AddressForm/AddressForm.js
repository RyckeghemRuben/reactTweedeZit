import React from 'react';


const addressForm = (props) => {
    return(
        <div>
            <form onSubmit={props.submit}>
        <p>
            <h3>{props.children}</h3>
            <label>Name</label>
            <input type="text" name="name" value={props.name}
            onChange={props.change}/>
            <label>City</label>
            <input type="text" name="city" value={props.city}
                   onChange={props.change}/>
            <button type="submit"> Save card </button>
        </p>
            </form>
        </div>
    );
}

export default addressForm;