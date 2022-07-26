import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { animated, useSpring } from "react-spring";

export const DisplayExercise = observer(({exercise, pass, handleKeyPress}) => {
    const style = useSpring({ opacity: 1, from: { opacity: 0 } })

    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        setValue('')
        document.getElementById("input").focus()
    }, [exercise])

    const determinePronoun = (exercise) => {
        if (exercise.pronoun === "je" && "aâàäeéèêëiîïoöôuùûüyÿ".indexOf(exercise.conjugatedVerb[0]) !== -1) {
            return "j'"
        } else {
            return exercise.pronoun
        }
    }

    return(
        <animated.div style={style}>
            <div className="space-y-2 text-xl sm:text-4xl">
                <div className="text-center">
                    {exercise.tense}
                </div>

                <div className="flex">
                    <span className="grow text-right pr-2">{determinePronoun(exercise)}</span>
                    <input id="input" className="grow-0 px-2" style={{width: (exercise.verbToConjugate.length + 4).toString() + "ch"}} value={value} onChange={handleChange} type="text" onKeyDown={handleKeyPress}/>
                    <span className="grow pl-2 text-start">({exercise.verbToConjugate})</span>
                </div>

                <div className="text-center">
                    { pass }
                </div>
            </div>
        </animated.div>
    )
})