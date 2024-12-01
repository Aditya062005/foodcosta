const express = require('express');
const FoodItem = require('../models/FoodItem');
const router = express.Router();

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new food item
router.post('/', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const foodItem = new FoodItem({ name, price, image });
    const savedFoodItem = await foodItem.save();
    res.status(201).json(savedFoodItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search food items by name
router.get('/search', async (req, res) => {
  const searchTerm = req.query.q.toLowerCase();
  try {
    const foodItems = await FoodItem.find({
      name: { $regex: searchTerm, $options: 'i' },
    });
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

