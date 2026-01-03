const transporter = require("../config/emailConfig");

exports.sendResetPasswordLink = async (to, token, userEmail) => {
  const link = `${process.env.RESET_PASSWORD_LINK}/${token}`;

  await transporter.sendMail({
    from: `"Temple Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <h3>Hello ${userEmail}</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
};
