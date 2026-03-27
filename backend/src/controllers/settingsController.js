const Organization = require("../models/Organization");

exports.getSettings = async (req, res) => {
  const org = await Organization.findById(req.user.orgId);
  res.json(org);
};

exports.updateSettings = async (req, res) => {
  const updated = await Organization.findByIdAndUpdate(
    req.user.orgId,
    { defaultLowStock: req.body.defaultLowStock },
    { new: true }
  );
  res.json(updated);
};