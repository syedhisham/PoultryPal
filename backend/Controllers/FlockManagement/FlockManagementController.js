const Flock = require('../../Models/Flock/FlockModel');
const VaccinationRecord = require('../../Models/VaccinationRecord/VaccinationRecordModel');
const Product = require('../../Models/Products/ProductsModel');

exports.addFlock = async (req, res) => {
  const { name,description, type, size, ageInWeeks, healthStatus, location, image, pricePerBird } = req.body;
  const managedBy = req.user._id;

  try {
    const newFlock = new Flock({
      name,
      type,
      size,
      ageInWeeks,
      healthStatus,
      location,
      image,
      price: pricePerBird, // Price per bird
      managedBy
    });

    await newFlock.save();

    // Create corresponding product entry with price per bird
    const newProduct = new Product({
      name: newFlock.name,
      category: 'Live Birds and Chicks',
      image: newFlock.image,
      price: newFlock.price, // Price per bird
      description,
      stock: newFlock.size, // Total birds in stock
      refId: newFlock._id
    });

    await newProduct.save();

    res.status(201).json({ message: 'Flock and product created successfully', flock: newFlock, product: newProduct });
  } catch (error) {
    console.error('Error adding flock:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.updateFlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, size, ageInWeeks, healthStatus, location, image, pricePerBird } = req.body;

    const updatedFlock = await Flock.findByIdAndUpdate(
      id,
      { name, type, size, ageInWeeks, healthStatus, location, image, price: pricePerBird },
      { new: true }
    );

    if (!updatedFlock) {
      return res.status(404).json({ message: 'Flock entry not found' });
    }

    // Update the corresponding product
    const updatedProduct = await Product.findOneAndUpdate(
      { refId: id },
      {
        name: updatedFlock.name,
        category: 'Live Birds and Chicks',
        image: updatedFlock.image,
        price: updatedFlock.price,
        description,
        stock: updatedFlock.size
      },
      { new: true }
    );

    res.status(200).json({ message: 'Flock and product updated successfully', flock: updatedFlock, product: updatedProduct });
  } catch (error) {
    console.error('Error updating flock:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteFlock = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the flock entry
    const deletedFlock = await Flock.findByIdAndDelete(id);

    if (!deletedFlock) {
      return res.status(404).json({ message: 'Flock entry not found' });
    }

    // Delete the corresponding product
    await Product.findOneAndDelete({ refId: id });

    res.status(200).json({ message: 'Flock and product deleted successfully' });
  } catch (error) {
    console.error('Error deleting flock:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all flocks
exports.getAllFlocks = async (req, res) => {
  try {
    console.log('Getting all flocks');
    const flocks = await Flock.find().populate('managedBy', 'firstName lastName email');
    res.status(200).json({ flocks });
  } catch (error) {
    console.error('Error fetching flocks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single flock by ID
exports.getFlockById = async (req, res) => {
  try {
    const { id } = req.params;
    const flock = await Flock.findById(id).populate('managedBy', 'firstName lastName email');

    if (!flock) {
      return res.status(404).json({ message: 'Flock entry not found' });
    }

    res.status(200).json({ flock });
  } catch (error) {
    console.error('Error fetching flock:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Add Vaccination Record
exports.addVaccinationRecord = async (req, res) => {
  const { flockId, vaccineType, dosageAmount, vaccinationDate, veterinarian, nextVaccinationDate, notes } = req.body;

  try {
    const newVaccinationRecord = new VaccinationRecord({
      flockId,
      vaccineType,
      dosageAmount,
      vaccinationDate,
      veterinarian,
      nextVaccinationDate,
      notes
    });

    await newVaccinationRecord.save();
    res.status(201).json({ message: 'Vaccination record added successfully', vaccinationRecord: newVaccinationRecord });
  } catch (error) {
    console.error('Error adding vaccination record:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
