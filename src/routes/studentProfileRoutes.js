const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Student = require("../models/students");
const path = require("path");
const fs = require("fs");

// Ensure uploads/resumes folder exists
const uploadDir = path.join(__dirname, "../uploads/resumes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// POST /api/studentprofile
router.post("/", auth, async (req, res) => {
  try {
    let resumePath = null;

    if (req.files && req.files.resume) {
      const resume = req.files.resume;

      // Allowed extensions
      const allowed = [".pdf", ".doc", ".docx"];
      const ext = path.extname(resume.name).toLowerCase();
      if (!allowed.includes(ext)) {
        return res.status(400).json({ success: false, message: "Only PDF, DOC, DOCX allowed!" });
      }

      // New filename
      const fileName = Date.now() + "-" + resume.name.replace(/\s+/g, "_");
      resumePath = path.join(uploadDir, fileName);

      // Move file
      await resume.mv(resumePath);
    }

    // Save student profile
    const profile = new Student({
      user: req.user.id,
      ...req.body,
      resume: resumePath ? `/uploads/resumes/${path.basename(resumePath)}` : null
    });

    await profile.save();
    res.json({ success: true, message: "Profile saved successfully!" });
  } catch (err) {
    console.error("Profile Save Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const auth = require("../middleware/authMiddleware");
// const Student = require("../models/Student");

// // Storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/resumes");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
//   },
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowed = [".pdf", ".doc", ".docx"];
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowed.includes(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF, DOC, DOCX allowed!"));
//   }
// };

// const upload = multer({ storage, fileFilter });

// // POST /api/studentprofile
// router.post("/", auth, upload.single("resume"), async (req, res) => {
//   try {
//     const data = req.body;
//     const resumePath = req.file ? req.file.path : null;

//     const profile = new Student({
//       user: req.user.id,
//       ...data,
//       resume: resumePath,
//     });

//     await profile.save();
//     res.json({ success: true, message: "Profile saved successfully!" });
//   } catch (err) {
//     console.error("Profile Save Error:", err.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// module.exports = router;
