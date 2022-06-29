import React, { useState, useEffect } from "react"

import { DeskMenuOverlay, MobileMenuOverlay, Checkbox } from "./";

export const OptButton = ({ options, title }) => {
    const [show, setShow] = useState(false);
    const [checks, setChecks] = useState(Object.fromEntries(options.map(tense => [tense, false])));
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        updatePredicate()
        window.addEventListener("resize", updatePredicate)

        return () => window.removeEventListener("resize", updatePredicate)
    })

    const handleOptionChange = (cbID) => {
        console.log(checks)
        const value = !checks[cbID]
        setChecks({...checks, [cbID]: value})
    }

    const handleButtonClick = () => {
        setShow(!show)
    }

    const updatePredicate = () => {
        setIsDesktop(window.innerWidth > 640)
    }

    const chooseMenu = () => {
        if (show) {
            if (isDesktop) {
                return(
                    <DeskMenuOverlay tensesItems={tensesItems}/>
                )
            } else {
                return(
                    <MobileMenuOverlay onClick={handleButtonClick} tensesItems={tensesItems} onOptionChange={handleOptionChange} checks={checks}/>
                )
            }
        }
    }

    const tensesItems = options.map((tense) => 
        <Checkbox checked={checks[tense]}  tense={tense} onChange={handleOptionChange}/>
    )

    const blurb = () => {
        let selected = ""
        Object.keys(checks).forEach(tense => {
            if (checks[tense]) {
                selected = selected + tense + " "
            }
        })

        return(
            <p className="max-w-full text-left overflow-hidden whitespace-nowrap text-ellipsis text-black/40">
                {selected}
            </p>
        )
    }

    return(
        <div className="sm:relative">
            <button className="h-16 w-full ring-2 ring-[#197278]/30 rounded-md px-4 py-2 flex flex-col justify-between" onClick={() => setShow(!show)}>
                <h3 className="w-full text-left text-[#197278] text-base font-bold">{title}</h3>
                {blurb()}
            </button>
            {
                chooseMenu() 
            }
        </div>
    )
}