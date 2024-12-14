import { useDataContext } from "../../Context/DataContext";
import "./Nav.css"

const Nav = ({setQuery}) => {
    const HandleChange = (e) => {
        setQuery(e.target.value);
    }
    const {category,setCategory,query} = useDataContext();
    const HandleCategory = (e) => {
        if (e.target.value === "1") {
            setCategory(null);
        }else {
            setCategory(e.target.value);
        }
    }

    return(
        <div className="nav">
            <input type="text" autoComplete="off" onChange={HandleChange} value={query}/>
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
        </div>
    )
}
export default Nav;