const Product = require("../models/Product");
const Organization = require("../models/Organization");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      organizationId: req.user.orgId
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      organizationId: req.user.orgId
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const products = await Product.find({
      organizationId: req.user.orgId
    });

    const totalProducts = products.length;

    const totalQuantity = products.reduce(
      (sum, p) => sum + (p.quantity || 0),
      0
    );

    const org = await Organization.findById(req.user.orgId);

    const lowStock = products.filter(p => {
      const threshold = p.lowStockThreshold ?? org.defaultLowStock;
      return p.quantity <= threshold;
    });

    res.json({
      totalProducts,
      totalQuantity,
      lowStock
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};