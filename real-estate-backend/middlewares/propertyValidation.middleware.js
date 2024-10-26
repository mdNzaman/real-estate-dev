const validateProperty = (req, res, next) => {
  const { title, price, property_type, status } = req.body;

  const errors = [];

  console.log(req.body);
  if (!title) errors.push("Title is required");
  if (!price || price <= 0) errors.push("Valid price is required");
  if (!property_type) errors.push("Property type is required");
  if (!status) errors.push("Status is required");

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = {
  validateProperty,
};
