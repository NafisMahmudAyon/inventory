// SupplierForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    remark: '',
    selectedCategories: [],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategorySelect = (categoryId) => {
    if (formData.selectedCategories.includes(categoryId)) {
      setFormData((prevData) => ({
        ...prevData,
        selectedCategories: prevData.selectedCategories.filter(
          (id) => id !== categoryId
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        selectedCategories: [...prevData.selectedCategories, categoryId],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, address, remark, selectedCategories } = formData;

    if (name.trim() === '') {
      alert('Supplier name is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/suppliers', {
        name,
        phone,
        address,
        remark,
        categories: selectedCategories,
      });

      if (response.status === 201) {
        alert('Supplier added successfully.');
        setFormData({
          name: '',
          phone: '',
          address: '',
          remark: '',
          selectedCategories: [],
        });
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Supplier</h2>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Remark:</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Categories:</label>
          <div className="flex flex-wrap">
            {categories.map((category) => (
              <label
                key={category.id}
                className="inline-block bg-gray-200 px-2 py-1 rounded-md mr-2 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.selectedCategories.includes(category.id)}
                  onChange={() => handleCategorySelect(category.id)}
                  className="mr-1"
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;
