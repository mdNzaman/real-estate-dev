const db = require("../configs/db.config");
const bcrypt = require("bcryptjs");

const findByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const findById = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, name, email, phone, role FROM users WHERE id = ?",
    [id],
  );
  return rows[0];
};

const create = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
    [userData.name, userData.email, hashedPassword, userData.phone],
  );
  return findById(result.insertId);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  findByEmail,
  findById,
  create,
  comparePassword,
};
