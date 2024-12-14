import { createContext, useContext, useState } from "react";

export const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({children}) => {
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [initial,setInitial] = useState(false);
    const [end,setEnd] = useState(false);
    const [category,setCategory] = useState(null);
    const [query,setQuery] = useState("");
    return(
        <DataContext.Provider value={{data,setData,page,setPage,initial,setInitial,end,setEnd,category,setCategory,query,setQuery}}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider