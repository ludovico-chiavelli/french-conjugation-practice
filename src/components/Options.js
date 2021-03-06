import React, { useContext, useState }from "react";
import { Redirect } from "react-router-dom";

import { PreferencesBtn, SelectBtn, ErrorMsg } from ".";

import { OptionsContext } from "../App";


export const Options = () => {
    const drillOptions = useContext(OptionsContext)
    const [start, setStart] = useState(false)
    const [showError, setShowError] = useState(false)

    const handleClick = () => {
        const tensesIsEmpty = Object.values(drillOptions.tenses).every(value => value === false)
        const categoriesIsEmpty = Object.values(drillOptions.categories).every(value => value === false)
        const pronsIsEmpty = Object.values(drillOptions.pronouns).every(value => value === false)

        if (!tensesIsEmpty && !categoriesIsEmpty && !pronsIsEmpty) {
            setStart(true)
        } else {
            setShowError(true)
        }
    }

    return(
        <section className="h-full w-5/6 sm:w-4/5 md:max-w-4xl">
            <div>
                <h1 className="my-10 text-2xl font-bold text-center">Conjugation Drill</h1>
                <PreferencesBtn type="TENSES" checks={drillOptions.tenses} options={Object.keys(drillOptions.tenses)}/>
                <PreferencesBtn type="CATEGORIES" checks={drillOptions.categories} options={Object.keys(drillOptions.categories)}/>
                <PreferencesBtn type="PRONOUNS" checks={drillOptions.pronouns} options={Object.keys(drillOptions.pronouns)}/>
            </div>
            <div className="mt-10">
                <h3>Verbs</h3>
                <SelectBtn type="VERBS" options={Object.keys(drillOptions.selectionOfVerbs)}/>
            </div>
            <div className="my-10">
                <h3>Length</h3>
                <SelectBtn type="AMOUNT" options={Object.keys(drillOptions.numWords)}/>
            </div>
            <div className="flex justify-center mb-5">
                { showError ?
                    <button type="button" className="rounded-md bg-[#ff0c0c] text-[#EDDDD4] text-2xl py-1 px-2" onClick={handleClick}>
                        { <ErrorMsg show={showError} setShow={setShowError}/> }
                    </button> :
                    <button type="button" className="rounded-md bg-[#197278] text-[#EDDDD4] text-2xl py-1 px-2" onClick={handleClick}>
                        { "Start drill" }
                    </button>

                }
            </div>
            { start && <Redirect to="/exerciseDrill"/>}
        </section>
    )
}