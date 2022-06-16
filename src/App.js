import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

/* Cosas Para agregar:
*  --> Animación cuando se seleccionan los dados hacia el "inventario" 
*/

function App(){

    const [diceArray, setDiceArray] = React.useState(allDiceArray());
    const [tenzies, setTenzies] = React.useState(false);
    const [rolls, setRolls] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [bestTime, setBestTime] = React.useState(0);

    React.useEffect( () => {
        const condition1 = diceArray.every( dice => dice.isHeld);
        const condition2 = diceArray.every( dice => dice.value === diceArray[0].value);
        if(condition1 && condition2){
            setTenzies(true);
        }

        /* SAME CODE:
        const condition1ar = diceArray.map( dice => dice.isHeld);
        const condition2ar = diceArray.map( dice => dice.value);
        for(let i = 0; i < 10; i++){
            if(!(condition1ar[i] && condition2ar[i] === condition2ar[0])){
                return
            }
        }
        console.log("U1")
        */
    }, [diceArray])

    React.useEffect( () => { 
        timeRun();   
    }, [time, tenzies]);
    
    async function timeRun(){
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(1000)
        if(!tenzies){
            setTime( old => old+1)
        }
        
    }

    function generateNewDice(){
        return {
                value: Math.floor(Math.random()*6)+1,
                isHeld: false,
                id: nanoid(),
            }
    }
    
    function allDiceArray(){
        let tempArray = [];
        for(let i = 0; i < 10; i++){
            tempArray.push(generateNewDice());
        }
        return tempArray;
    }

    function recordTime(){
        let record = localStorage.getItem("bestTime");
        if(time < record){
            localStorage.setItem("bestTime", time)
        }
        return localStorage.getItem("bestTime");
    }
    React.useEffect( () => {
        if(tenzies){
            setBestTime(recordTime())
        }
    }, [tenzies]);

    function handleRoll(){
        setDiceArray( old => old.map( dice => (
            dice.isHeld? dice : generateNewDice()
        )));
        setRolls( old => old+1);
        if (tenzies) {
            setDiceArray(allDiceArray());
            setTenzies(false);
            setRolls(0);
            setTime(0);
        }
    }

    function holdDice(id){
        setDiceArray( old => old.map( dice => (
            dice.id === id? {...dice, isHeld: !dice.isHeld} : dice
        )));
    }

    const diceArrayMap = diceArray.map( element => <Die 
        value={element.value} 
        key={element.id} 
        isHeld={element.isHeld}
        handleClick={ () => holdDice(element.id)}
        />);

    return(
        <main className="Main">
            <div className="TopConteiner">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.</p>

                <div className="Counters">
                    <h2>Rolls: {rolls}</h2>
                    <h2>Time: {time}</h2>
                </div>
            </div>
            
            <div className="DieConteiner">
                {diceArrayMap}
            </div>

            <button className="RollButton" onClick={handleRoll}>
                {tenzies? "New Game" : "Roll"}
            </button>
            {tenzies && <Confetti />}

            {tenzies && <h1>Best Time: {bestTime}</h1>}
        </main>
    )
}

export default App;