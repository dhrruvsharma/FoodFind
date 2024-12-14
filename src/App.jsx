import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import DataProvider from "./Context/DataContext";
import Product from "./Components/Product/Product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <DataProvider>
            <Home />
          </DataProvider>
        } />
        <Route path="/product/:id" element= {
          <DataProvider>
            <Product />
          </DataProvider>
        } />
      </Routes>
    </BrowserRouter>
  )
}
export default App;