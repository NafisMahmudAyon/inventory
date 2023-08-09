import CategoryForm from "./components/CategoryForm";
import ColorForm from "./components/ColorForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SizeForm from "./components/SizeForm";
import SupplierForm from "./components/SupplierForm";
import UpdateProductForm from "./components/UpdateProductForm";

function App() {
  return (
    // <>
    //   <CategoryForm />
    //   <SupplierForm />
    //   {/* <ColorForm />
    //   <SizeForm /> */}
    //   <ProductForm />
    //   <div className="h-[400px]"></div>
    //   <ProductList />
    //   {/* <UpdateProductForm /> */}
    // </>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<ProductForm />}></Route>
        <Route path="/update-product/:productId" element={<UpdateProductForm />} ></Route>
        <Route path="/products" element={<ProductList />} ></Route>
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
