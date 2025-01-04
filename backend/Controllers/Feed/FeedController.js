const FeedManagement = require('../../Models/FeedManagement/FeedManagementModel');
const Product = require('../../Models/Products/ProductsModel');

// Create a new feed entry
exports.createFeed = async (req, res) => {
  const { feedType,description, quantity, unit, threshold, supplier, lastOrderDate, nextOrderDate, image,perUnit, price } = req.body;
  const managedBy = req.user._id;

  try {
    const newFeed = new FeedManagement({
      feedType,
      quantity,
      unit,
      threshold,
      supplier,
      lastOrderDate,
      nextOrderDate,
      image,
      price, // Price per kg
      perUnit,
      managedBy
    });

    await newFeed.save();

    // Create corresponding product entry with price per kg
    const newProduct = new Product({
      name: newFeed.feedType,
      category: 'Feed',
      image: newFeed.image,
      price: newFeed.price, // Price per kg
      description,
      stock: newFeed.quantity, // Total feed quantity in stock
      refId: newFeed._id
    });

    await newProduct.save();

    res.status(201).json({ message: 'Feed and product created successfully', feed: newFeed, product: newProduct });
  } catch (error) {
    console.error('Error creating feed entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all feed entries
exports.getAllFeeds = async (req, res) => {
  try {
    const feeds = await FeedManagement.find().populate('managedBy', 'firstName lastName email');
    res.status(200).json({ feeds });
  } catch (error) {
    console.error('Error fetching feed entries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get a single feed entry by ID
exports.getFeedById = async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await FeedManagement.findById(id).populate('managedBy', 'firstName lastName email');

    if (!feed) {
      return res.status(404).json({ message: 'Feed entry not found' });
    }

    res.status(200).json({ feed });
  } catch (error) {
    console.error('Error fetching feed entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Update a feed entry by ID
exports.updateFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedType, quantity, unit, threshold, supplier, lastOrderDate, nextOrderDate, image, price, perUnit, description } = req.body;

    const updatedFeed = await FeedManagement.findByIdAndUpdate(
      id,
      { feedType, quantity, unit, threshold, supplier, lastOrderDate, nextOrderDate, image, price, perUnit, description },
      { new: true }
    );

    if (!updatedFeed) {
      return res.status(404).json({ message: 'Feed entry not found' });
    }

    // Update the corresponding product
    await Product.findOneAndUpdate(
      { refId: id },
      {
        name: updatedFeed.feedType,
        price: updatedFeed.price,
        stock: updatedFeed.quantity,
        image: updatedFeed.image,
        description: updatedFeed.description
      },
      { new: true }
    );

    res.status(200).json({ message: 'Feed and product updated successfully', feed: updatedFeed });
  } catch (error) {
    console.error('Error updating feed entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Delete a feed entry by ID
exports.deleteFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeed = await FeedManagement.findByIdAndDelete(id);

    if (!deletedFeed) {
      return res.status(404).json({ message: 'Feed entry not found' });
    }

    // Also delete the corresponding product
    await Product.findOneAndDelete({ refId: id });

    res.status(200).json({ message: 'Feed entry and product deleted successfully' });
  } catch (error) {
    console.error('Error deleting feed entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Add usage history to a feed entry
exports.addUsageHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amountUsed } = req.body;

    const feed = await FeedManagement.findById(id);
    if (!feed) {
      return res.status(404).json({ message: 'Feed entry not found' });
    }

    feed.usageHistory.push({ date, amountUsed });
    await feed.save();

    res.status(200).json({ message: 'Usage history added successfully', feed });
  } catch (error) {
    console.error('Error adding usage history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Calculate next order date based on threshold
exports.calculateNextOrderDate = async (req, res) => {
  try {
    const { id } = req.params;

    const feed = await FeedManagement.findById(id);
    if (!feed) {
      return res.status(404).json({ message: 'Feed entry not found' });
    }

    // Calculate next order date logic (example: if quantity is below threshold, set nextOrderDate to today's date)
    if (feed.quantity < feed.threshold) {
      feed.nextOrderDate = new Date();
    }

    await feed.save();
    res.status(200).json({ message: 'Next order date calculated and updated', feed });
  } catch (error) {
    console.error('Error calculating next order date:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

