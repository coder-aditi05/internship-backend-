const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: { type: String },

    college: { type: String, trim: true },
    degree: { type: String, trim: true },
    branch: { type: String, trim: true },
    year: { type: String, trim: true },
    cgpa: { type: String, trim: true },

    techskills: { type: String, trim: true },
    softskills: { type: String, trim: true },
    interest: { type: String, trim: true },
    domain: { type: String, trim: true },
    location: { type: String, trim: true },
    duration: { type: String, trim: true },

    paid: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },

    projects: { type: String, trim: true },
    certs: { type: String, trim: true },
    achievements: { type: String, trim: true },

    resume: { type: String }, // just the file path
  },
  { timestamps: true }
);

// ✅ Virtual for Resume Full URL
StudentSchema.virtual("resumeUrl").get(function () {
  if (this.resume) {
    return `${process.env.BASE_URL || "http://localhost:5000"}/${this.resume}`;
  }
  return null;
});

// ✅ Indexing for faster search on email + domain
StudentSchema.index({ email: 1, domain: 1 });

module.exports = mongoose.model("Student", StudentSchema);




// const mongoose = require("mongoose");

// const StudentSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     fullname: String,
//     email: String,
//     phone: String,
//     gender: String,
//     dob: String,
//     college: String,
//     degree: String,
//     branch: String,
//     year: String,
//     cgpa: String,
//     techskills: String,
//     softskills: String,
//     interest: String,
//     domain: String,
//     location: String,
//     duration: String,
//     paid: String,
//     projects: String,
//     certs: String,
//     achievements: String,
//     resume: String, // resume file path
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Student", StudentSchema);
