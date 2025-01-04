const Refund = require('../../Models/Refund/RefundModel');
const Order = require('../../Models/Order/OrderModel');
const sendEmail = require('../../mail/sendEmail');

// Process Refund
exports.processRefund = async (req, res) => {
  const { orderId, reason,refundAmount } = req.body;
const userId = req.user._id;
  try {
    const newRefund = new Refund({
      orderId,
      user: userId,
      reason,
      refundAmount,
      processedDate: Date.now()
    });

    await newRefund.save();
    // Update the order's refundRequest status to "Requested"
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { refundRequest: 'Requested' } }, // Set the refundRequest to "Requested"
      { new: true } // Return the updated order document
    );

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(201).json({ message: 'Refund request processed', refund: newRefund });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find()
  .populate('user', 'firstName lastName email image')
  .populate({
    path: 'orderId',
    select: 'sessionId address city zipcode totalPrice products',
    populate: {
      path: 'products.productId',
      model: 'product', // Ensure you reference the Product model
      select: 'name price image', // Select relevant fields from Product model
    }
  });

    res.status(200).json(refunds);
  } catch (error) {
    console.error('Error fetching refunds:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Controller to update the refund status
exports.updateRefundStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 

    // Find the refund by its ID and update its status
    const refund = await Refund.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    ).populate('user', 'firstName lastName email');

    // If refund is not found
    if (!refund) {
      return res.status(404).json({ message: 'Refund not found.' });
    }
    const order = await Order.findByIdAndUpdate(
      refund.orderId,
       { refundRequest:status},
       {new: true}
      );
    // If order is not found
    if (!order) {
      return res.status(404).json({ message: 'order not found.' });
    }
    await sendEmail({
      email:refund.user.email,
      orderId:refund.orderId,
      subject: 'Refund Status',
      type: 'refundStatus',
      refundAmount:refund.refundAmount,
      refundReason:refund.reason,
      refundStatus:status,
      name: `${refund.user.firstName} ${refund.user.lastName}`,
    });
    res.status(200).json({
      message: 'Refund status updated successfully.',
      refund
    });
  } catch (error) {
    console.error('Error updating refund status:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};