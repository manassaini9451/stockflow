const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  },
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  description: String,
  quantity: {
    type: Number,
    default: 0
  },
  costPrice: Number,
  sellingPrice: Number,
  lowStockThreshold: Number
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);