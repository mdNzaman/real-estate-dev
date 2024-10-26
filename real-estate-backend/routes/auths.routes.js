const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auths.controllers");
const { authenticateToken } = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);

// Protected route example
router.get("/me", authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

module.exports = router;
