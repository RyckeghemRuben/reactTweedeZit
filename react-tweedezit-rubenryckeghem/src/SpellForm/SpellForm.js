import React from 'react';


const spellForm = (props) => {
    return(
        <div>
            <form onSubmit={props.submit}>
                <p>
                    <label>Name</label>
                    <input type="text" value={props.value} onChange={props.change}/>
                    <button type="submit">testknop</button>
                </p>
            </form>
        </div>
    );
}

export default spellForm;