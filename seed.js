require('dotenv').config();
const mongoose = require('mongoose');
const FoodItem = require('./models/FoodItem'); // Path to your FoodItem model

const seedData = [
  { name: "Pizza", image: "pizza.jpg", price: 299, description: "Delicious margherita pizza with fresh tomatoes and basil." },
  { name: "Burger", image: "burger.jpg", price: 99, description: "Juicy beef burger with lettuce, tomato, and cheese." },
  { name: "Biryani", image: "biryani.avif", price: 249, description: "Flavorful rice with tender meat and aromatic spices." },
  { name: "Noodles", image: "hakka noodles.jpg", price: 199, description: "Hakka-style noodles with mixed vegetables." },
  { name: "Roll", image: "panner tikka roll.jpg", price: 85, description: "Paneer tikka roll wrapped in soft flatbread." },
  { name: "Gol Gappe", image: "golgappe.jpg", price: 49, description: "Crispy, tangy street food with spiced water." },
  { name: "Vada", image: "vada.jpg", price: 69, description: "South Indian snack made from spiced mashed potatoes." }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    
    await FoodItem.deleteMany(); // Clear existing data
    await FoodItem.insertMany(seedData); // Insert seed data
    console.log('Database seeded successfully');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDB();
