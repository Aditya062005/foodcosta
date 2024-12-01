const express = require('express');
const Cart = require('../models/cart');
const Food = require('../models/FoodItem');

const router = express.Router();

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.foodId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to the cart
router.post('/:userId', async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.params.userId });

    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    if (cart) {
      const existingItem = cart.items.find(item => item.foodId.toString() === foodId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ foodId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new Cart({
        user: req.params.userId,
        items: [{ foodId, quantity }],
        totalPrice: foodItem.price * quantity,
      });
      await newCart.save();
    }

    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from the cart
router.delete('/:userId/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
