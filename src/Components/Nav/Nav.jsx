import { useState } from "react";
import { useDataContext } from "../../Context/DataContext";
import "./Nav.css"
import { useNavigate } from "react-router-dom";

const Nav = ({ setQuery }) => {
    const HandleChange = (e) => {
        setQuery(e.target.value);
    }
    const { category, setCategory, query, sort, setSort,setData } = useDataContext();
    const [id, setId] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [vis, setVis] = useState(false);
    const HandleCategory = (e) => {
        if (e.target.value === "1") {
            setCategory(null);
        } else {
            setCategory(e.target.value);
        }
    }

    const HandleSort = (e) => {
        if (e.target.value === "1") {
            setSort(null);
        } else {
            setSort(e.target.value);
        }
    }

    const HandleId = (e) => {
        setValue(e.target.value);
    }

    const HandleSubmit = (e) => {
        setData([]);
        e.preventDefault();
        navigate(`/product/${value}`)
    }

    return (
        <div className="nav">
            {!id && (
                <>
                    <select value={sort} onChange={HandleSort}>
                        <option value="1" defaultChecked>-Sort-</option>
                        <option value="product_name">Alphabetically</option>
                        <option value="nutriscore_score">Nutritionally</option>
                    </select>
                    <input type="text" autoComplete="off" onChange={HandleChange} value={query} placeholder="Enter your query" onFocus={() => { setVis(true) }}/>
                    {vis && <p style={{ position: "absolute", top: "25px",cursor: "pointer" }} onClick={() => { setId(true) }}>Search by code instead?</p>}
                </>
            )}
            {id && (
                <form className="id-search" onSubmit={HandleSubmit}>
                    <input type="text" autoComplete="off" placeholder="Enter the ID" required onChange={HandleId} />
                    <p onClick={() => setId(false)} style={{ position: "absolute", top: "25px",cursor:"pointer" }}>Search using query?</p>
                    <button type="submit">Go</button>
                </form>
            )}
            {!id && (
                <select value={category} id="" onChange={HandleCategory}>
                    <option value="1" defaultChecked>-All-</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Cheeses">Cheeses</option>
                    <option value="Meals">Meals</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Biscuits and Cakes">Biscuits and Cakes</option>
                    <option value="Snacks">Snakcs</option>
                    <option value="Beverages">Beverages</option>
                </select>
            )}
        </div>
    )
}
export default Nav;