import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductSelector from './ProductSelector';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    orderNo: '',
    invoiceNo: '',
    date: '',
    customerName: '',
    address: '',
    mobileNumber: '',
    paymentMethod: '',
    paymentStatus: '',
    transactionId: '',
    amount: '',
    bkashMobileNumber: '',
    courierProvider: '',
    courierDate: '',
    courierStatus: '',
    courierTrackingNumber: '',
    products: [],
  });

  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    // Fetch product list from the database
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProductList(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);


  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { productId: '', colorId: '', sizeId: '', quantity: '' }]);
  };

//   const handleProductSelect = (productId) => {
//     const productData = {
//       productId,
//       colorId: null,
//       sizeId: null,
//       quantity: "",
//     };
//     setOrderData({
//       ...orderData,
//       selectedProducts: [...selectedProducts, productData],
//     });
//   };
// const handleProductSelect = (productId, colorId, sizeId) => {
//     const selectedProduct = {
//       productId,
//       colorId,
//       sizeId,
//       quantity: 1, // You can set an initial quantity here
//     };

//     setOrderData((prevData) => ({
//       ...prevData,
//       selectedProducts: [...prevData.selectedProducts, selectedProduct],
//     }));
//   };

// const handleProductSelect = (productId) => {
//     const productData = {
//       productId,
//       colorId: null,
//       sizeId: null,
//       quantity: "",
//     };
//     setSelectedProducts([...selectedProducts, productData]);
//   };


const handleProductSelect = (productId) => {
    const newProduct = {
      productId,
      colorId: null,
      sizeId: null,
      quantity: "",
    };
    setSelectedProducts( [...selectedProducts, newProduct]);
  };
  

  const handlePlaceOrder = async () => {
    // Send the selected order data to the backend
    try {
      const response = await axios.post('http://localhost:5000/api/place-order', orderData);

      if (response.status === 200) {
        console.log('Order placed successfully');
      } else {
        console.error('Error placing order');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
//   const handleColorSelect = (index, colorId) => {
//     const updatedProducts = [...orderData.selectedProducts];
//     updatedProducts[index].colorId = colorId;
//     setOrderData({
//       ...orderData,
//       selectedProducts: updatedProducts,
//     });
//   };
const handleColorSelect = (index, colorId) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].colorId = colorId;
    setSelectedProducts(updatedProducts);
  
    // Fetch sizes based on the selected product and color
    const productId = updatedProducts[index].productId;
    fetchSizes(productId, colorId)
      .then(sizes => {
        const sizesWithQuantity = sizes.map(size => ({ sizeId: size.id, quantity: "" }));
        updatedProducts[index].sizes = sizesWithQuantity;
        setSelectedProducts(updatedProducts);
      })
      .catch(error => {
        console.error('Error fetching sizes:', error);
      });
  };
  const handleSizeSelect = (index, sizeId) => {
    const updatedProducts = [...orderData.selectedProducts];
    updatedProducts[index].sizeId = sizeId;
    setOrderData({
      ...orderData,
      selectedProducts: updatedProducts,
    });
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...orderData.selectedProducts];
    updatedProducts[index].quantity = quantity;
    setOrderData({
      ...orderData,
      selectedProducts: updatedProducts,
    });
  };

  return (
    <div>
      {/* Render order form fields */}
      <div>
        {/* order details  */}
        <div>
          <label>Order Number:</label>
          <input
            type="text"
            value={orderData.orderNo}
            onChange={(e) => setOrderData({ ...orderData, orderNo: e.target.value })}
          />
        </div>
        <div>
          <label>Invoice Number:</label>
          <input
            type="text"
            value={orderData.invoiceNo}
            onChange={(e) => setOrderData({ ...orderData, invoiceNo: e.target.value })}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={orderData.date}
            onChange={(e) => setOrderData({ ...orderData, date: e.target.value })}
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={orderData.customerName}
            onChange={(e) =>
              setOrderData({ ...orderData, customerName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={orderData.address}
            onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={orderData.mobileNumber}
            onChange={(e) =>
              setOrderData({ ...orderData, mobileNumber: e.target.value })
            }
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <input
            type="text"
            value={orderData.paymentMethod}
            onChange={(e) =>
              setOrderData({ ...orderData, paymentMethod: e.target.value })
            }
          />
        </div>
        <div>
          <label>Payment Status:</label>
          <input
            type="text"
            value={orderData.paymentStatus}
            onChange={(e) =>
              setOrderData({ ...orderData, paymentStatus: e.target.value })
            }
          />
        </div>
        <div>
          <label>Transaction Id:</label>
          <input
            type="text"
            value={orderData.transactionId}
            onChange={(e) =>
              setOrderData({ ...orderData, transactionId: e.target.value })
            }
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={orderData.amount}
            onChange={(e) => setOrderData({ ...orderData, amount: e.target.value })}
          />
        </div>
        <div>
          <label>Bkash Mobile Number:</label>
          <input
            type="text"
            value={orderData.bkashMobileNumber}
            onChange={(e) =>
              setOrderData({ ...orderData, bkashMobileNumber: e.target.value })
            }
          />
        </div>
        <div>
          <label>Courier Provider:</label>
          <input
            type="text"
            value={orderData.courierProvider}
            onChange={(e) =>
              setOrderData({ ...orderData, courierProvider: e.target.value })
            }
          />
        </div>
        <div>
          <label>Courier Date:</label>
          <input
            type="date"
            value={orderData.courierDate}
            onChange={(e) =>
              setOrderData({ ...orderData, courierDate: e.target.value })
            }
          />
        </div>
        <div>
          <label>Courier Status:</label>
          <input
            type="text"
            value={orderData.courierStatus}
            onChange={(e) =>
              setOrderData({ ...orderData, courierStatus: e.target.value })
            }
          />
        </div>
        <div>
          <label>Courier Tracking Number:</label>
          <input
            type="text"
            value={orderData.courierTrackingNumber}
            onChange={(e) =>
              setOrderData({ ...orderData, courierTrackingNumber: e.target.value })
            }
          />
        </div>
      </div>
      {/* ... */}

      {selectedProducts.map((productData, index) => (
        <div key={index}>
        <h2>Product {index + 1}</h2>
        <ProductSelector
          onSelectProduct={(productId) => handleProductSelect(productId)}
        />
        {productData.productId && (
          <>
            <ColorSelector
              productId={productData.productId}
              onSelectColor={(colorId) => handleColorSelect(index, colorId)}
            />
            {productData.colorId && (
              <SizeSelector
                productId={productData.productId}
                colorId={productData.colorId}
                onSelectSize={(sizeId) => handleSizeSelect(index, sizeId)}
              />
            )}
            {productData.sizeId && (
              <div>
                <label htmlFor={`quantity-${index}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  value={productData.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </div>
              )}
              </>
            )}
          </div>
      ))}

      <button type="button" onClick={handleAddProduct}>
        Add Product
      </button>
      <button type="button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;
