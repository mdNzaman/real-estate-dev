const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/auth.middleware");
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
} = require("../controllers/properties.controllers");
const {
  validateProperty,
} = require("../middlewares/propertyValidation.middleware");

// Public routes
router.get("/search", searchProperties);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// Admin routes
// Update the admin routes
router.post(
  "/",
  authenticateToken,
  authorizeAdmin,
  validateProperty,
  createProperty,
);
router.put(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  validateProperty,
  updateProperty,
);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteProperty);

module.exports = router;
