import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
const Card = React.memo(({image,name,onLoad,onError,id }) => {
    const navigate = useNavigate();
    const HandleClick = () => {
        sessionStorage.setItem("pos",window.scrollY);
        navigate(`product/${id}`);
    }
    return (
        <div id="masonry-item" onClick={HandleClick}>
            <figure>
                <img src={image} rel="prefetch" alt="Image not available" className="masonry-image" onLoad={onLoad} onError={onError} loading="lazy"/>
            </figure>
            <p>{name}</p>
        </div>
    )
})
export default Card;