const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  defaultLowStock: {
    type: Number,
    default: 5
  }
}, { timestamps: true });

module.exports = mongoose.model("Organization", organizationSchema);