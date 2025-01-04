const Inventory = require('../../Models/Inventory/InventoryModel');

// Fetch Inventory Records
exports.getInventoryRecords = async (req, res) => {
  try {
    const records = await Inventory.find({});
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching inventory records:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update Inventory
exports.updateInventory = async (req, res) => {
  const { itemId, stockLevel } = req.body;

  try {
    const item = await Inventory.findByIdAndUpdate(itemId, { stockLevel }, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json({ message: 'Inventory updated successfully', item });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
