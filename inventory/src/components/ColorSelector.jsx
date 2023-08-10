import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ColorSelector = ({ productId, onSelectColor }) => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    async function fetchColors() {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setColors(response.data?.colors);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    }

    if (productId) {
      fetchColors();
    }
  }, [productId]);

  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
    onSelectColor(colorId);
  };

  return (
    <div>
      <label>Select Color:</label>
      <select value={selectedColor} onChange={(e) => handleColorSelect(e.target.value)}>
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorSelector;
