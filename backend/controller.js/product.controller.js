import mongoose from 'mongoose';
import Product from '../models/product.model.js';



export const getProducts = async (req, res) => {
  
  try {
    const products = await Product.find()
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in get products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async(req, res) => {

  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success:false, message: "All fields are required" });
  }

  const newProduct = new Product(product)

  try{
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully", data: newProduct});

  }catch(error) {
    console.log("Error in create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error"});
  }   
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params


  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Product id" });
  }

  try {
    await Product.findByIdAndDelete(id);

  
    res.json({ success: true, message: "Product deleted successfully", data: removedProduct });

  } catch (error) {
    console.log("Error in delete product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateProduct = async (req, res) => {
  const {id} = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
    res.status(201).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
      res.status(500).json({success: false, message: "Server Error"});
  }
};