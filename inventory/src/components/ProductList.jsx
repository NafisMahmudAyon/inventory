import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {products.map((product) => (
        <div key={product.id} className="border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <p className="mb-2">Product Code: {product.productCode}</p>
          <p className="mb-2">Product Category: {product.productCategory}</p>
          <p className="mb-2">Supplier: {product.supplierName}</p>
          <p className="mb-2">Buying Price: {product.buyingPrice}</p>
          <p className="mb-2">Buying Date: {product.buyingDate}</p>
          <p className="mb-2">Selling Price: {product.sellingPrice}</p>
          {product.details.map((color) => (
            <div key={color.id} className="mt-4">
              <h3 className="text-lg font-semibold">Color: {color.color}</h3>
              {color.sizes.map((size) => (
                <div key={size.id} className="flex items-center">
                  <p className="mr-2">Size: {size.size}</p>
                  <p className="mr-2">Quantity: {size.quantity}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
