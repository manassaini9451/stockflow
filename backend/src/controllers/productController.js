const Product = require("../models/Product");
const Organization = require("../models/Organization");

// ✅ CREATE PRODUCT (SKU unique check added)
exports.createProduct = async (req, res) => {
  try {
    const existing = await Product.findOne({
      sku: req.body.sku,
      organizationId: req.user.orgId
    });

    if (existing) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    const product = await Product.create({
      ...req.body,
      organizationId: req.user.orgId
    });

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET PRODUCTS
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

// ✅ UPDATE PRODUCT
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

// ✅ DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DASHBOARD (threshold logic)
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

    const lowStock = products.map(p => {
      const threshold = p.lowStockThreshold ?? org.defaultLowStock;

      return {
        ...p.toObject(),
        threshold
      };
    }).filter(p => p.quantity <= p.threshold);

    res.json({
      totalProducts,
      totalQuantity,
      lowStock
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};