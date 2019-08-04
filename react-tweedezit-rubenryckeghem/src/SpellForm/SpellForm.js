import React from 'react';


const spellForm = (props) => {
    return(
        <div>
            <form onSubmit={props.submit}>
                <p>
                    <label>Name</label>
                    <input type="text" name="spellName" value={props.spellName}
                           onChange={props.change}/>
                    <button type="submit">testknop</button>
                </p>
            </form>
        </div>
    );
}

export default spellForm;