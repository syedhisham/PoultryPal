const Supplier = require('../../Models/Supplier/Supplier');
const sendEmail = require('../../mail/sendEmail');

// Add a new supplier
exports.addSupplier = async (req, res) => {
    const { name, image, phoneNumber } = req.body;
    try {
        const newSupplier = new Supplier({ name, image, phoneNumber });
        await newSupplier.save();

        res.status(201).json({ message: 'Supplier added successfully.', supplier: newSupplier });
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({});
        res.status(200).json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update an existing supplier
// exports.updateSupplier = async (req, res) => {
//     const { id } = req.params;
//     const { name, image, phoneNumber } = req.body;

//     try {

//         const updatedSupplier = await Supplier.findByIdAndUpdate(
//             id,
//             { name, image, phoneNumber },
//             { new: true }
//         );

//         if (!updatedSupplier) {
//             return res.status(404).json({ message: 'Supplier not found.' });
//         }

//         res.status(200).json({ message: 'Supplier updated successfully.', supplier: updatedSupplier });
//     } catch (error) {
//         console.error('Error updating supplier:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, image, phoneNumber } = req.body;

    try {
        // Build the update object dynamically, including 'image' only if it's provided
        const updateData = {
            ...(name && { name }),
            ...(phoneNumber && { phoneNumber }),
            ...(image && { image }),
        };

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found.' });
        }

        res.status(200).json({ message: 'Supplier updated successfully.', supplier: updatedSupplier });
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found.' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully.' });
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};