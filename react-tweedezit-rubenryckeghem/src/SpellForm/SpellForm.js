import React from 'react';


const spellForm = (props) => {
    return(
        <div>
            <form onSubmit={props.submit}>
                <p>
                    <label>Name of spell</label>
                    <input type="text" className="search-input" value={props.value} onChange={props.change}/>
                </p>
            </form>
        </div>
    );
}

export default spellForm;