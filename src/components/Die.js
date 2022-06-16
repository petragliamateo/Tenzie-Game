import React from "react";
import {nanoid} from "nanoid";

function Die(props){

    function numberToDot(){
        let dotArray = [];
        for(let i = 0; i < props.value; i++ ){
            dotArray.push(<div className="Dot" key={nanoid()} ></div>);
        }
        return dotArray
    }

    return(
    <div 
        className={`Die ${props.isHeld ? "heldDie" : ""}`}
        onClick={props.handleClick}
    >    
        {numberToDot()}
    </div>
    )
    
}

export default Die;