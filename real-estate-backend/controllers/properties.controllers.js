const db = require("../configs/db.config");

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT p.*, u.name as agent_name
      FROM properties p
      LEFT JOIN users u ON p.agent_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: error.message,
    });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT p.*, u.name as agent_name
      FROM properties p
      LEFT JOIN users u ON p.agent_id = u.id
      WHERE p.id = ?
    `,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Get property images
    const [images] = await db.execute(
      "SELECT * FROM property_images WHERE property_id = ?",
      [req.params.id],
    );

    // Get property features
    const [features] = await db.execute(
      "SELECT * FROM property_features WHERE property_id = ?",
      [req.params.id],
    );

    const property = {
      ...rows[0],
      images,
      features: features.map((f) => f.feature_name),
    };

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching property",
      error: error.message,
    });
  }
};

// Create new property
const createProperty = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const {
      title,
      description,
      price,
      address,
      city,
      state,
      zip_code,
      property_type,
      status,
      bedrooms,
      bathrooms,
      area,
      features,
      images,
    } = req.body;

    // Insert property
    const [result] = await connection.execute(
      `INSERT INTO properties (
        title, description, price, address, city, state, zip_code,
        property_type, status, bedrooms, bathrooms, area, agent_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        price,
        address,
        city,
        state,
        zip_code,
        property_type,
        status,
        bedrooms,
        bathrooms,
        area,
        req.user.userId,
      ],
    );

    const propertyId = result.insertId;

    // Insert features
    if (features && features.length > 0) {
      const featuresValues = features.map((feature) => [propertyId, feature]);
      await connection.query(
        "INSERT INTO property_features (property_id, feature_name) VALUES ?",
        [featuresValues],
      );
    }

    // Insert images
    if (images && images.length > 0) {
      const imageValues = images.map((image, index) => [
        propertyId,
        image,
        index === 0,
      ]);
      await connection.query(
        "INSERT INTO property_images (property_id, image_url, is_primary) VALUES ?",
        [imageValues],
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: { id: propertyId },
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "Error creating property",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

// Update property
const updateProperty = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { id } = req.params;
    const {
      title,
      description,
      price,
      address,
      city,
      state,
      zip_code,
      property_type,
      status,
      bedrooms,
      bathrooms,
      area,
      features,
      images,
    } = req.body;

    // Update property
    await connection.execute(
      `UPDATE properties SET
        title = ?, description = ?, price = ?, address = ?,
        city = ?, state = ?, zip_code = ?, property_type = ?,
        status = ?, bedrooms = ?, bathrooms = ?, area = ?
      WHERE id = ?`,
      [
        title,
        description,
        price,
        address,
        city,
        state,
        zip_code,
        property_type,
        status,
        bedrooms,
        bathrooms,
        area,
        id,
      ],
    );

    // Update features
    await connection.execute(
      "DELETE FROM property_features WHERE property_id = ?",
      [id],
    );
    if (features && features.length > 0) {
      const featuresValues = features.map((feature) => [id, feature]);
      await connection.query(
        "INSERT INTO property_features (property_id, feature_name) VALUES ?",
        [featuresValues],
      );
    }

    // Update images
    if (images && images.length > 0) {
      await connection.execute(
        "DELETE FROM property_images WHERE property_id = ?",
        [id],
      );
      const imageValues = images.map((image, index) => [
        id,
        image,
        index === 0,
      ]);
      await connection.query(
        "INSERT INTO property_images (property_id, image_url, is_primary) VALUES ?",
        [imageValues],
      );
    }

    await connection.commit();

    res.json({
      success: true,
      message: "Property updated successfully",
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "Error updating property",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Delete related records first
    await connection.execute(
      "DELETE FROM property_features WHERE property_id = ?",
      [req.params.id],
    );
    await connection.execute(
      "DELETE FROM property_images WHERE property_id = ?",
      [req.params.id],
    );
    // Delete the property
    await connection.execute("DELETE FROM properties WHERE id = ?", [
      req.params.id,
    ]);

    await connection.commit();

    res.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "Error deleting property",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

// Search properties
const searchProperties = async (req, res) => {
  try {
    const { keyword, city, propertyType, minPrice, maxPrice, status } =
      req.query;

    let query = `
      SELECT p.*, u.name as agent_name
      FROM properties p
      LEFT JOIN users u ON p.agent_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (keyword) {
      query += ` AND (p.title LIKE ? OR p.description LIKE ?)`;
      params.push(`%${keyword}%`, `%${keyword}%`);
    }
    if (city) {
      query += ` AND p.city = ?`;
      params.push(city);
    }
    if (propertyType) {
      query += ` AND p.property_type = ?`;
      params.push(propertyType);
    }
    if (minPrice) {
      query += ` AND p.price >= ?`;
      params.push(minPrice);
    }
    if (maxPrice) {
      query += ` AND p.price <= ?`;
      params.push(maxPrice);
    }
    if (status) {
      query += ` AND p.status = ?`;
      params.push(status);
    }

    query += ` ORDER BY p.created_at DESC`;

    const [rows] = await db.execute(query, params);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching properties",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
};
