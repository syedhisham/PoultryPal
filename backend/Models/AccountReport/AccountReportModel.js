const mongoose = require('mongoose');

const accountingReportSchema = new mongoose.Schema({
  reportType: { type: String, enum: ['Balance Sheet', 'Income Statement', 'Cash Flow'], required: true },
  generatedDate: { type: Date, default: Date.now },
  data: { type: mongoose.Schema.Types.Mixed }, // Can hold different types of financial data
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true } // Reference to User (Admin or Accountant)
});

module.exports = mongoose.model('AccountingReport', accountingReportSchema);
