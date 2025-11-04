const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { sendOtp } = require("../utils/sendOtp");
const {
  findAdminByEmail,
  findAdminByPhone,
  updateAdminPasswordByEmail,
  updateAdminPasswordByPhone,
  updateAdminPasswordById,
} = require("../models/loginModel");

const otpStore = {}; // Temporary memory store

// ================= LOGIN =================
const login = (req, res) => {
  const { email, phone, name, password } = req.body;
  if (!email && !phone && !name)
    return res.status(400).json({ message: "Email, phone, or name required" });

  const field = email ? "email" : phone ? "phone" : "name";
  const value = email || phone || name;

  db.query(`SELECT * FROM admin WHERE ${field} = ?`, [value], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const admin = results[0];
    if (!bcrypt.compareSync(password, admin.password))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, temple_id: admin.temple_id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    }).json({ message: "Login successful", token, role: admin.role });
  });
};

// ================= FORGOT PASSWORD (Auto Email or WhatsApp) =================
const forgotPassword = async (req, res) => {
  const { email, phone } = req.body;
  if (!email && !phone)
    return res.status(400).json({ message: "Email or phone required" });

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const findFn = email ? findAdminByEmail : findAdminByPhone;
    const identifier = email || phone;

    findFn(identifier, async (err, admin) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (!admin)
        return res.status(404).json({ message: email ? "Email not found" : "Phone not found" });

      otpStore[identifier] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

      await sendOtp({ email, phone, otp, userEmail: admin.email });
      res.json({ message: `OTP sent to ${email ? "email" : "WhatsApp"}` });
    });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ================= VERIFY OTP =================
const verifyOtp = (req, res) => {
  const { email, phone, otp } = req.body;
  const key = email || phone;
  const stored = otpStore[key];

  if (!stored) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > stored.expiresAt) return res.status(400).json({ message: "OTP expired" });
  if (parseInt(otp) !== stored.otp) return res.status(400).json({ message: "Invalid OTP" });

  res.json({ message: "OTP verified" });
};

// ================= RESET PASSWORD =================
const resetPassword = (req, res) => {
  const { email, phone, otp, newPassword } = req.body;
  const key = email || phone;
  const stored = otpStore[key];

  if (!stored) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > stored.expiresAt) return res.status(400).json({ message: "OTP expired" });
  if (parseInt(otp) !== stored.otp) return res.status(400).json({ message: "Invalid OTP" });

  const hashed = bcrypt.hashSync(newPassword, 10);
  const updateFn = email ? updateAdminPasswordByEmail : updateAdminPasswordByPhone;

  updateFn(key, hashed, (err) => {
    if (err) return res.status(500).json({ message: "DB error" });
    delete otpStore[key];
    res.json({ message: "Password reset successful" });
  });
};

// ================= CHANGE PASSWORD =================
const changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { adminId } = req.user;

  db.query("SELECT * FROM admin WHERE id = ?", [adminId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (!results.length) return res.status(404).json({ message: "Admin not found" });

    const admin = results[0];
    if (!bcrypt.compareSync(oldPassword, admin.password))
      return res.status(401).json({ message: "Old password incorrect" });

    const hashed = bcrypt.hashSync(newPassword, 10);
    updateAdminPasswordById(adminId, hashed, (err) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json({ message: "Password changed successfully" });
    });
  });
};

module.exports = { login, forgotPassword, verifyOtp, resetPassword, changePassword };
