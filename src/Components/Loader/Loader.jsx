import React from "react";
import "./Loader.css"

const Loader = ({height,width}) => {
    return(
        <>
            <div className="loader-container">
                <div className="loader" style={{height: `${height}`, width:`${width}`}}></div>
            </div>
        </>
    )
}
export default Loader;