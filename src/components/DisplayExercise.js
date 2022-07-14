import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import checkAnswer from "../utils/checkAnswer";

export const DisplayExercise = ({exercises}) => {
    const [value, setValue] = useState('')
    const [execIndex, setExecIndex] = useState(0)
    const [pass, setPass] = useState(null)
    const [attempt, setAttempt] = useState(1)
    const [completed, setCompleted] = useState(false)
    
    const handleKeyPress = (e) => {
        if(e.key === "Enter" && attempt === 1){
            if(!checkAnswer(exercises[execIndex].conjugatedVerb, value)) {
                setPass(exercises[execIndex].conjugatedVerb)
                setAttempt(2)
            } else {
                handleContinue()
            }

        } else if (e.key === "Enter" && attempt === 2) {
            setAttempt(1)
            handleContinue()
        }
      }
    
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleCompletion = () => {
        setCompleted(true)
    }

    const handleContinue = () => {
        setPass(null)
        setValue('')
        execIndex < exercises.length - 1 ? setExecIndex(execIndex + 1) : handleCompletion()
    }


    return(
        <div className="grid grid-cols-3 grid-rows-3 text-center text-lg">
            <div className="col-start-1 col-span-1 row-start-2 row-span-1 text-end pr-2">{exercises[execIndex].pronoun}</div>

            <div className="col-start-2 col-span-1 row-start-1 row-span-1">
                {exercises[execIndex].tense}
            </div>
            <div className="col-start-2 col-span-1 row-start-2 row-span-1">
                <input className="max-w-full" value={value} onChange={handleChange} type="text" onKeyDown={handleKeyPress}/>
            </div>
            <div className="col-start-1 col-span-3 row-start-3 row-span-1">
                <span className="text-center">{ pass }</span>
            </div>

            <div className="col-start-3 col-span-1 row-start-2 row-span-1 text-start pl-2">
                <span className="pl-2 text-start">({exercises[execIndex].verbToConjugate})</span>
            </div>
            { completed && <Redirect to="/results"/>}
        </div>
    )
}