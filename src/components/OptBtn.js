import React, { useState } from "react";

export const OptBtn = () => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show)
    }

    return(
        <div className="sm:relative first:mt-4 my-4">
            <button className="h-16 w-full ring-2 ring-[#197278]/30 rounded-md px-4 py-2 flex flex-col justify-between" onClick={handleClick}>
                <h3 className="w-full text-left text-[#197278] text-base font-bold">{title}</h3>
                {blurb()}
            </button>
            {
                chooseMenu() 
            }
        </div>
    )
}