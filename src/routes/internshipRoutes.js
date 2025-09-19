const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");
const auth = require("../middleware/authMiddleware");

// helper: accept skills as array or comma string
const normalizeSkills = (s) => {
  if (!s) return [];
  if (Array.isArray(s)) return s.map(x => x.trim()).filter(Boolean);
  if (typeof s === "string") return s.split(",").map(x => x.trim()).filter(Boolean);
  return [];
};

// ✅ GET Top 5 internships
router.get("/top5", async (req, res, next) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 }).limit(5);
    return res.json(internships);
  } catch (err) {
    next(err);
  }
});


// ✅ LIST + SEARCH + PAGINATION
// GET /api/internships?skill=react&location=Remote&company=Google&page=1&limit=10&sort=createdAt
router.get("/", async (req, res, next) => {
  try {
    const { skill, location, company, page = 1, limit = 10, sort } = req.query;
    const filter = {};

    if (location) filter.location = new RegExp(location, "i");
    if (company) filter.company = new RegExp(company, "i");
    if (skill) filter.skills = { $in: [new RegExp(skill, "i")] };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortObj = sort ? { [sort]: -1 } : { createdAt: -1 };

    const [total, internships] = await Promise.all([
      Internship.countDocuments(filter),
      Internship.find(filter).sort(sortObj).skip(skip).limit(parseInt(limit))
    ]);

    return res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      internships
    });
  } catch (err) {
    next(err);
  }
});

// ✅ GET single internship
router.get("/:id", async (req, res, next) => {
  try {
    const intern = await Internship.findById(req.params.id);
    if (!intern) return res.status(404).json({ error: "Internship not found" });
    return res.json(intern);
  } catch (err) {
    next(err);
  }
});

// ✅ CREATE internship (protected)
router.post("/", auth, async (req, res, next) => {
  try {
    const { title, company, skills, duration, stipend, location, applyBy } = req.body;
    if (!title || !company) {
      return res.status(400).json({ error: "title and company are required" });
    }

    const skillsArr = normalizeSkills(skills);
    if (skillsArr.length === 0) {
      return res.status(400).json({ error: "At least one skill required" });
    }

    const internship = new Internship({
      title,
      company,
      skills: skillsArr,
      duration,
      stipend,
      location,
      applyBy
    });

    const saved = await internship.save();
    return res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// ✅ UPDATE internship (protected)
router.put("/:id", auth, async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.skills) updates.skills = normalizeSkills(updates.skills);

    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Internship not found" });
    return res.json(updated);
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE internship (protected)
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const removed = await Internship.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Internship not found" });
    return res.json({ msg: "Internship deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
