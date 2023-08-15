import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Appbar from "./components/Appbar";
import ShowProducts from "./components/ShowProducts";
import Cart from "./components/Cart";
import AddProducts from "./components/products";
import {} from "./App.css";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/addProduct" element={<AddProducts />} />
        <Route
          path="/Products"
          element={
            <ShowProducts products={products} setProducts={setProducts} />
          }
        />
        <Route path="/Cart" element={<Cart products={products} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
