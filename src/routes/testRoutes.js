const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Backend setup working fine 🚀" });
});

module.exports = router;