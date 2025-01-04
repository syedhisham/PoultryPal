const Eggs = require('../../Models/Eggs/EggsModel');
const Product = require('../../Models/Products/ProductsModel');

exports.createEggs = async (req, res) => {
  const { eggType, description, quantity, supplier, productionDate, expiryDate, image, pricePerDozen } = req.body;
  const managedBy = req.user._id;

  try {
    const newEggs = new Eggs({
      eggType,
      quantity,
      supplier,
      productionDate,
      expiryDate,
      image,
      pricePerDozen, // Price per dozen
      managedBy
    });

    await newEggs.save();

    // Create corresponding product entry with price per dozen
    const newProduct = new Product({
      name: newEggs.eggType,
      category: 'Fresh and Specialty Eggs',
      image: newEggs.image,
      price: newEggs.pricePerDozen, // Price per dozen
      description,
      stock: newEggs.quantity, // Total quantity in stock (in dozens)
      refId: newEggs._id // Reference to the eggs entry
    });

    await newProduct.save();

    res.status(201).json({ message: 'Eggs and product created successfully', eggs: newEggs, product: newProduct });
  } catch (error) {
    console.error('Error creating eggs entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.updateEggs = async (req, res) => {
  const { id } = req.params;
  const { eggType, description, quantity, supplier, productionDate, expiryDate, image, pricePerDozen } = req.body;

  try {
    // Update the eggs entry
    const updatedEggs = await Eggs.findByIdAndUpdate(id, {
      eggType,
      quantity,
      supplier,
      productionDate,
      expiryDate,
      image,
      pricePerDozen
    }, { new: true });

    if (!updatedEggs) {
      return res.status(404).json({ message: 'Eggs entry not found' });
    }

    // Update the corresponding product
    await Product.findOneAndUpdate(
      { refId: id },
      {
        name: eggType,
        price: pricePerDozen,
        stock: quantity,
        image: image,
        description: description
      },
      { new: true }
    );

    res.status(200).json({ message: 'Eggs and product updated successfully', eggs: updatedEggs });
  } catch (error) {
    console.error('Error updating eggs entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteEggs = async (req, res) => {
  const { id } = req.params;

  try {
    const eggsEntry = await Eggs.findByIdAndDelete(id);

    if (!eggsEntry) {
      return res.status(404).json({ message: 'Eggs entry not found' });
    }

    // Also delete the corresponding product
    await Product.findOneAndDelete({ refId: id });

    res.status(200).json({ message: 'Eggs and product deleted successfully' });
  } catch (error) {
    console.error('Error deleting eggs entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getEggs = async (req, res) => {
  const { id } = req.params;

  try {
    const eggsEntry = await Eggs.findById(id);

    if (!eggsEntry) {
      return res.status(404).json({ message: 'Eggs entry not found' });
    }

    res.status(200).json(eggsEntry);
  } catch (error) {
    console.error('Error fetching eggs entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllEggs = async (req, res) => {
  try {
    console.log('Getting all eggs');
    const allEggs = await Eggs.find().populate('managedBy', 'firstName lastName email');

     res.status(200).json(allEggs);
  } catch (error) {
    console.error('Error fetching eggs entries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
