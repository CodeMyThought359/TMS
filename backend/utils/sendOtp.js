


const transporter = require("../config/emailConfig");

// ✅ Node 20+ supports global fetch natively
const fetch = global.fetch;

// 🎨 Console colors for better logs
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

// ================= EMAIL OTP =================
async function sendEmailOtp(email, otp, userEmail) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Hello ${userEmail || "User"},\n\nYour OTP is ${otp}. It expires in 5 minutes.`,
    });

    console.log(`${colors.green}📩 Email OTP sent to: ${email}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ Failed to send email OTP: ${error.message}${colors.reset}`);
    throw error;
  }
}

// ================= WHATSAPP OTP (Vision360 API) =================
async function sendWhatsAppOtp(phone, otp, userEmail) {
  try {
    // ✅ Use phone number exactly as provided (no +91 added)
    const formattedPhone = phone.replace(/\s+/g, "");

    // 🔐 Vision360 credentials (can move to .env)
    const token = "cm2afvcrx4xfgod8pfrdkyxna";
    const apiUrl = "https://wts.vision360solutions.co.in/api/sendText";

    // 📝 WhatsApp message
    const messageText =
      `🙏 Dear ${userEmail || "User"},\n` +
      `Your OTP is ${otp}.\n` +
      `It expires in 5 minutes.\n` +
      `- Temple Management System`;

    // Encode message for safe URL usage
    const message = encodeURIComponent(messageText).replace(/%0A/g, "%0D%0A");

    // Build full API URL
    const url = `${apiUrl}?token=${token}&phone=${formattedPhone}&message=${message}`;

    console.log(`${colors.blue}🌐 Sending WhatsApp OTP to: ${formattedPhone}${colors.reset}`);
    console.log(`${colors.yellow}🔗 URL: ${url}${colors.reset}`);

    // Send GET request (same as PHP cURL version)
    const response = await fetch(url, { method: "GET" });
    const text = await response.text();

    console.log(`${colors.yellow}📩 Vision360 Response: ${text}${colors.reset}`);

    // ✅ Check for success
    if (!/success|ok|sent/i.test(text)) {
      throw new Error(`Vision360 API failed: ${text}`);
    }

    console.log(`${colors.green}✅ WhatsApp OTP sent successfully to: ${formattedPhone}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ Error sending WhatsApp OTP: ${error.message}${colors.reset}`);
    throw error;
  }
}

// ================= UNIVERSAL FUNCTION =================
async function sendOtp({ email, phone, otp, userEmail }) {
  if (email) {
    console.log(`${colors.blue}📧 Sending OTP via Email...${colors.reset}`);
    return await sendEmailOtp(email, otp, userEmail);
  } else if (phone) {
    console.log(`${colors.blue}💬 Sending OTP via WhatsApp...${colors.reset}`);
    return await sendWhatsAppOtp(phone, otp, userEmail);
  } else {
    throw new Error("❌ Neither email nor phone provided for OTP sending.");
  }
}

module.exports = { sendEmailOtp, sendWhatsAppOtp, sendOtp };
