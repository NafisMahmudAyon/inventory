import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [buyingPrice, setBuyingPrice] = useState('');
    const [buyingDate, setBuyingDate] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [colors, setColors] = useState([{ color: '', sizes: [{ size: '', quantity: '' }] }]);
    // const [images, setImages] = useState([{ images: [{ image: '' }] }]);
    const [links, setLinks] = useState([{ link: '' }]);

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [sizeList, setSizeList] = useState([]);


    useEffect(() => {
        async function fetchData() {
          try {
            const categoryResponse = await axios.get('http://localhost:5000/api/categories');
            const supplierResponse = await axios.get('http://localhost:5000/api/suppliers');
            const colorResponse = await axios.get('http://localhost:5000/api/colors');
            const sizeResponse = await axios.get('http://localhost:5000/api/sizes');
    
            setCategories(categoryResponse.data);
            setSuppliers(supplierResponse.data);
            setColorList(colorResponse.data);
            setSizeList(sizeResponse.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        fetchData();
    }, []);

  const handleAddColor = () => {
    setColors([...colors, { color: '', sizes: [{ size: '', quantity: '' }] }]);
  };

  const handleRemoveColor = (colorIndex) => {
    const updatedColors = colors.filter((_, index) => index !== colorIndex);
    setColors(updatedColors);
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, e) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].sizes[sizeIndex][field] = e.target.value;
    setColors(updatedColors);
  };
  // const handleImageChange = (imageIndex, field, e) => {
  //   const updatedImages = [...images];
  //   updatedImages[imageIndex][field] = e.target.value;
  //   setImages(updatedImages);
  // };

  const handleAddSize = (colorIndex) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].sizes.push({ size: '', quantity: '' });
    setColors(updatedColors);
  };
  // const handleAddImage = (imagesIndex) => {
  //   const updatedImages = [...images];
  //   updatedImages[imagesIndex].push({ image: '' });
  //   setImages(updatedImages);
  // };

  const handleRemoveSize = (colorIndex, sizeIndex) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].sizes.splice(sizeIndex, 1);
    setColors(updatedColors);
  };
  // const handleRemoveImage = (imageIndex) => {
  //   const updatedImages = [...images];
  //   updatedImages[imageIndex].splice(imageIndex, 1);
  //   setImages(updatedImages);
  // };

//   const handleColorChange = (colorIndex, field, e) => {
//     const updatedColors = [...colors];
//     updatedColors[colorIndex][field] = e.target.value;
//     setColors(updatedColors);
//   };

const handleColorChange = (index, event) => {
    const updatedColors = [...colors];
    updatedColors[index].color = event.target.value;
    setColors(updatedColors);
  };


  const handleAddLink = () => {
    setLinks([...links, { link: '' }]);
  };
  
  const handleRemoveLink = (linkIndex) => {
    const updatedLinks = links.filter((_, index) => index !== linkIndex);
    setLinks(updatedLinks);
  };
  
  const handleLinkChange = (linkIndex, e) => {
    const updatedLinks = [...links];
    updatedLinks[linkIndex].link = e.target.value;
    setLinks(updatedLinks);
  };
  


  const handleSubmit = async () => {
    const productData = {
      productName,
      productCode,
      productCategory,
      supplier,
      buyingPrice,
      buyingDate,
      sellingPrice,
      colors,
      links,
    };
console.log(productData);
    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
    //   console.log(productData);

      if (response.status === 200) {
        console.log('Product data submitted successfully');
      } else {
        console.error('Error submitting product data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  console.log(colors)
  

  return (
    <div>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Product Code:</label>
        <input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Product Category:</label>
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Supplier:</label>
        <select
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          required
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Buying Price:</label>
        <input
          type="text"
          value={buyingPrice}
          onChange={(e) => setBuyingPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Buying Date:</label>
        <input
          type="date"
          value={buyingDate}
          onChange={(e) => setBuyingDate(e.target.value)}
        />
      </div>
      <div>
        <label>Selling Price:</label>
        <input
          type="text"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
      </div>


      {links.map((link, linkIndex) => (
  <div key={linkIndex}>
    <label htmlFor={`link-${linkIndex}`}>Link:</label>
    <input
      type="text"
      id={`link-${linkIndex}`}
      value={link.link}
      onChange={(e) => handleLinkChange(linkIndex, e)}
      required
    />
    <button type="button" onClick={() => handleRemoveLink(linkIndex)}>
      Remove Link
    </button>
  </div>
))}
<button type="button" onClick={handleAddLink}>
  Add Link
</button>










      {colors.map((color, colorIndex) => (
        <div key={colorIndex}>
          <label htmlFor={`color-${colorIndex}`}>Color:</label>
          <input
            type="text"
            id={`color-${colorIndex}`}
            value={color.color}
            onChange={(e) => handleColorChange(colorIndex, e)}
            required
          />
          <button type="button" onClick={() => handleRemoveColor(colorIndex)}>
            Remove Color
          </button>
          {color.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex}>
              <label htmlFor={`size-${colorIndex}-${sizeIndex}`}>Size:</label>
              <input
                type="text"
                id={`size-${colorIndex}-${sizeIndex}`}
                value={size.size}
                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, 'size', e)}
                required
              />
              <label htmlFor={`quantity-${colorIndex}-${sizeIndex}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${colorIndex}-${sizeIndex}`}
                value={size.quantity}
                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, 'quantity', e)}
                required
              />
              <button type="button" onClick={() => handleRemoveSize(colorIndex, sizeIndex)}>
                Remove Size
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddSize(colorIndex)}>
            Add Size
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddColor}>
        Add Color
      </button>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ProductForm;
