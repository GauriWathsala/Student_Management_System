const express = require ('express')
const router = express.Router()
const {Book} = require("../models");

// Function to generate random character
function generateRandomCharacter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }
  
  // Function to generate random numbers
  function generateRandomNumbers(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  // Generate bookId
function generateBookId() {
    const firstChar = generateRandomCharacter();
    const otherChars = generateRandomNumbers(3);
    return firstChar + otherChars;
  }
  
  // Add new book
  router.post('/', async (req, res) => {
    try {
      const { name, quantity } = req.body;
  
      // Generate bookId
      const bookId = generateBookId();
  
      // Create book
      const book = {
        bookId,
        name,
        quantity,
      };
      const createdBook = await Book.create(book);
  
      res.json(createdBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //Delete a book
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Book.destroy({ where: { bookId: id } });
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

// Add quantity of existing books
router.put('/:bookId/quantity', async (req, res) => {
    try {
      const { bookId } = req.params;
      const { quantity } = req.body;
  
      const book = await Book.findByPk(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      // Update the quantity
    book.quantity += quantity;
    await book.save();

    res.json({ message: 'Quantity updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
  
  module.exports = router;