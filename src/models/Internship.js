const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,  // extra space hata dega
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  skills: {
    type: [String],   // multiple skills list store karne ke liye
    required: true,
    default: [],
  },
  duration: {
    type: String,     // e.g. "3 months"
  },
  stipend: {
    type: String,     // e.g. "₹8000/month"
  },
  location: {
    type: String,
    default: "Remote", // agar location nhi di toh default Remote
  },
  applyBy: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model("Internship", InternshipSchema);
