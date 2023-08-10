import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SizeSelector = ({ productId, colorId, onSelectSize }) => {
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    async function fetchSizes() {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}/`);
        setSizes(response.data.sizes);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    }

    if (productId && colorId) {
      fetchSizes();
    }
  }, [productId, colorId]);

  const handleSizeSelect = (sizeId) => {
    setSelectedSize(sizeId);
    onSelectSize(sizeId);
  };

  return (
    <div>
      <label>Select Size:</label>
      <select value={selectedSize} onChange={(e) => handleSizeSelect(e.target.value)}>
        <option value="">Select Size</option>
        {sizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizeSelector;
