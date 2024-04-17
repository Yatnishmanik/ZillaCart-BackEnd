const Category = require("../models/category");
const post = require('../models/postModel')
const main = require('../app');
//create post
exports. createCategory = async (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  var { name, description } = req.body;
  name = name.trim().toLowerCase();
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//show posts
exports.showCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filtercategories=async(req,res,next)=>{
  try {
    const filterdata= req.query.category;
    // console.log(filterdata);
    const data = await post.find({category:filterdata}); 
  
    if (!data) {
      return res.status(404).json({ message: 'No posts found for the specified category.' });
    }
  
    // const filteredPosts = data.filter(post => post.category === category);
    res.json(data);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}