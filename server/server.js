const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventorydb",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

// Temporary storage for categories (replace with a database)
// const categories = [];

// app.post('/api/categories', (req, res) => {
//   const { categoryName } = req.body;
//   if (categoryName) {
//     categories.push(categoryName);
//     res.status(201).json({ message: 'Category added successfully' });
//   } else {
//     res.status(400).json({ error: 'Category name is required' });
//   }
// });

app.post("/api/categories", (req, res) => {
  const { categoryName } = req.body;
  if (categoryName) {
    const insertQuery = "INSERT INTO categories (name) VALUES (?)";
    db.query(insertQuery, [categoryName], (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "Category added successfully" });
      }
    });
  } else {
    res.status(400).json({ error: "Category name is required" });
  }
});

// Endpoint to get categories
app.get("/api/categories", (req, res) => {
  const selectQuery = "SELECT * FROM categories";
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Database select error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to add a supplier
app.post("/api/suppliers", (req, res) => {
  const { name, phone, address, remark, categories } = req.body;

  if (name.trim() === "") {
    res.status(400).json({ error: "Supplier name is required" });
    return;
  }

  const insertSupplierQuery =
    "INSERT INTO suppliers (name, phone, address, remark) VALUES (?, ?, ?, ?)";

  db.query(
    insertSupplierQuery,
    [name, phone, address, remark],
    (supplierErr, supplierResult) => {
      if (supplierErr) {
        console.error("Supplier insert error:", supplierErr);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const supplierId = supplierResult.insertId;

        const insertSupplierCategoryQuery =
          "INSERT INTO supplier_categories (supplier_id, category_id) VALUES (?, ?)";

        categories.forEach((categoryId) => {
          db.query(
            insertSupplierCategoryQuery,
            [supplierId, categoryId],
            (categoryErr) => {
              if (categoryErr) {
                console.error("Supplier category insert error:", categoryErr);
              }
            }
          );
        });

        res.status(201).json({ message: "Supplier added successfully" });
      }
    }
  );
});

// Endpoint to get all suppliers with category details
app.get('/api/suppliers', (req, res) => {
    const selectSuppliersQuery =
      'SELECT s.id, s.name, s.phone, s.address, s.remark, ' +
      'GROUP_CONCAT(DISTINCT c.name) AS categoryNames, GROUP_CONCAT(DISTINCT c.id) AS categoryIds ' +
      'FROM suppliers s ' +
      'LEFT JOIN supplier_categories sc ON s.id = sc.supplier_id ' +
      'LEFT JOIN categories c ON sc.category_id = c.id ' +
      'GROUP BY s.id';
  
    db.query(selectSuppliersQuery, (err, results) => {
      if (err) {
        console.error('Database select error:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const suppliersWithCategories = results.map((supplier) => {
          const categoryNames = supplier.categoryNames.split(',');
          const categoryIds = supplier.categoryIds.split(',').map(Number);
          return {
            id: supplier.id,
            name: supplier.name,
            phone: supplier.phone,
            address: supplier.address,
            remark: supplier.remark,
            categories: categoryNames.map((categoryName, index) => ({
              id: categoryIds[index],
              name: categoryName,
            })),
          };
        });
  
        res.json(suppliersWithCategories);
      }
    });
  });

// Endpoint to add a color
app.post('/api/colors', (req, res) => {
    const { name } = req.body;
  
    if (name.trim() === '') {
      res.status(400).json({ error: 'Color name is required' });
      return;
    }
  
    const insertColorQuery = 'INSERT INTO colors (name) VALUES (?)';
  
    db.query(insertColorQuery, [name], (err) => {
      if (err) {
        console.error('Color insert error:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Color added successfully' });
      }
    });
  });

  // Endpoint to get colors
app.get('/api/colors', (req, res) => {
    const selectColorsQuery = 'SELECT * FROM colors';
  
    db.query(selectColorsQuery, (err, results) => {
      if (err) {
        console.error('Database select error:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  


  // Endpoint to add a size
app.post('/api/sizes', (req, res) => {
    const { name } = req.body;
  
    if (name.trim() === '') {
      res.status(400).json({ error: 'Size name is required' });
      return;
    }
  
    const insertSizeQuery = 'INSERT INTO sizes (name) VALUES (?)';
  
    db.query(insertSizeQuery, [name], (err) => {
      if (err) {
        console.error('Size insert error:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Size added successfully' });
      }
    });
  });
  

  // Endpoint to get sizes
app.get('/api/sizes', (req, res) => {
    const selectSizesQuery = 'SELECT * FROM sizes';
  
    db.query(selectSizesQuery, (err, results) => {
      if (err) {
        console.error('Database select error:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  


  // Endpoint for adding a new product
// app.post('/api/products', async (req, res) => {
//     const { productName, productCode, productCategory, supplier, buyingPrice, buyingDate, sellingPrice, colors } = req.body;
  
//     try {
//       // Insert the product details into the products table
//       const productInsertQuery = `
//         INSERT INTO products (productName, productCode, productCategory, supplier_id, buyingPrice, buyingDate, sellingPrice)
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//       `;
//       const productValues = [productName, productCode, productCategory, supplier, buyingPrice, buyingDate, sellingPrice];
//       const productResult = await db.query(productInsertQuery, productValues);
//       const productId = productResult.insertId;
  
//       // Insert product variations into the product_variations table
//       for (const color of colors) {
//         const colorId = color.colorId;
//         for (const size of color.sizes) {
//           const sizeId = size.sizeId;
//           const quantityId = size.quantityId;
          
//           const variationInsertQuery = `
//             INSERT INTO product_variations (product_id, color_id, size_id, quantity)
//             VALUES (?, ?, ?, ?)
//           `;
//           const variationValues = [productId, colorId, sizeId, quantityId];
//           await db.query(variationInsertQuery, variationValues);
//         }
//       }
  
//       res.status(200).json({ message: 'Product data added successfully' });
//     } catch (error) {
//       console.error('Error adding product data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });


// app.post('/api/products', async (req, res) => {
//     const { productName, productCode, productCategory, supplierId, buyingPrice, buyingDate, sellingPrice, colors } = req.body;
  
//     try {
//       // Insert the product details into the products table
//       const productInsertQuery = `
//         INSERT INTO products (productName, productCode, productCategory, supplier_id, buyingPrice, buyingDate, sellingPrice)
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//       `;
//       const productValues = [productName, productCode, productCategory, supplierId, buyingPrice, buyingDate, sellingPrice];
//       const productResult = await db.query(productInsertQuery, productValues);
//       const productId = productResult.insertId;
  
//       // Insert product variations into the product_variations table
//     //   for (const color of colors) {
//     //     const colorId = color.colorId;
//     //     color.sizes.forEach(async (size) => {
//     //       const sizeId = size.sizeId;
//     //       const quantityId = size.quantityId;
      
//     //       const variationInsertQuery = `
//     //         INSERT INTO product_variations (product_id, color_id, size_id, quantity)
//     //         VALUES (?, ?, ?, ?)
//     //       `;
//     //       const variationValues = [productId, colorId, sizeId, quantityId];
//     //       await db.query(variationInsertQuery, variationValues);
//     //     });
//     //   }
 







  
//       res.status(200).json({ message: 'Product data added successfully' });
//     } catch (error) {
//       console.error('Error adding product data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });


// Endpoint for handling product form data
app.post('/api/products', (req, res) => {
    const { productName, productCode, productCategory, supplier, buyingPrice, buyingDate, sellingPrice, colors } = req.body;
    console.log(colors);
  
    // Insert product data into products table
    const productQuery = 'INSERT INTO products (productName, productCode, productCategory, supplier_id, buyingPrice, buyingDate, sellingPrice) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(productQuery, [productName, productCode, productCategory, supplier, buyingPrice, buyingDate, sellingPrice], (productErr, productResult) => {
      if (productErr) {
        console.error('Error inserting product data:', productErr);
        res.status(500).json({ error: 'An error occurred while inserting product data' });
        return;
      }
  
      const productId = productResult.insertId;
  
      // Insert color, size, and quantity data into respective tables
      colors.forEach((color) => {
        const colorQuery = 'INSERT INTO colors (color) VALUES (?)';
        db.query(colorQuery, [color.color], (colorErr, colorResult) => {
          if (colorErr) {
            console.error('Error inserting color data:', colorErr);
            return;
          }
  
          const colorId = colorResult.insertId;
  
          color.sizes.forEach((size) => {
            const sizeQuery = 'INSERT INTO sizes (size) VALUES (?)';
            db.query(sizeQuery, [size.size], (sizeErr, sizeResult) => {
              if (sizeErr) {
                console.error('Error inserting size data:', sizeErr);
                return;
              }
  
              const sizeId = sizeResult.insertId;
  
              const quantityQuery = 'INSERT INTO quantities (sizeId, quantity) VALUES (?, ?)';
              db.query(quantityQuery, [sizeId, size.quantity], (quantityErr) => {
                if (quantityErr) {
                  console.error('Error inserting quantity data:', quantityErr);
                }
              });
  
              const productVariationQuery = 'INSERT INTO product_variations (product_id, color_id, size_id) VALUES (?, ?, ?)';
              db.query(productVariationQuery, [productId, colorId, sizeId], (variationErr) => {
                if (variationErr) {
                  console.error('Error inserting product variation data:', variationErr);
                }
              });
            });
          });
        });
      });
  
      res.status(200).json({ message: 'Product data submitted successfully' });
    });
  });





  

// ... (rest of the server code)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
