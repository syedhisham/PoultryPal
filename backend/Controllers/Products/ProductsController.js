const Product = require('../../Models/Products/ProductsModel');
 exports.GetAllProducts = async (req, res) => {
    try {
      const data = await Product.find({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
exports.ProductsOfSpecificCategory = async (req, res) => {
    try {
      const category = req.params.category;
      let products;
  
      if (category === "All") {
        products = await Product.find({});
      } else {
        products = await Product.find({ category });
      }
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  exports.addProduct = async (req, res) => {
    try {
      const { name, price, description, image, category, stock } = req.body;
  
      // Check if the product already exists
      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product already exists' });
      }
  
      // Create a new product instance
      const newProduct = new Product({
        name,
        category,
        image,
        price,
        description,
        stock
      });
  
      // Save the product to the database
      await newProduct.save();
  
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.UpdateProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, price, description, image, category, stock } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, price, description, image, category, stock },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Delete a product by ID
exports.DeleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};