import CategoryForm from "./components/CategoryForm";
import ColorForm from "./components/ColorForm";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SizeForm from "./components/SizeForm";
import SupplierForm from "./components/SupplierForm";

function App() {
  return (
    <>
      <CategoryForm />
      <SupplierForm />
      {/* <ColorForm />
      <SizeForm /> */}
      <ProductForm />
      <div className="h-[400px]"></div>
      <ProductList />
    </>
  );
}

export default App;
