// utils/validation.js
import { apiGet } from "./helpers";
export function validateAdminForm(form, isEdit = false) {
  // Required fields (ignore password if editing and left blank)
  if (!form.name || !form.email || !form.phone || !form.temple_id) {
    return { valid: false, message: "❌ Please fill all required fields" };
  }

  // Name validation: letters & spaces only, at least 3 chars
  if (!/^[A-Za-z ]{3,}$/.test(form.name)) {
    return {
      valid: false,
      message: "❌ Name must contain only letters and be at least 3 characters",
    };
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return { valid: false, message: "❌ Enter a valid email address" };
  }

  // Phone validation: exactly 10 digits
  if (!/^\d{10}$/.test(form.phone)) {
    return { valid: false, message: "❌ Phone number must be exactly 10 digits" };
  }

  // Password validation (only if adding, or if password provided during edit)
  if (!isEdit || (isEdit && form.password)) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      return {
        valid: false,
        message:
          "❌ Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
      };
    }
  }

  return { valid: true };
}

// export async function checkAdminUniqueness(form, token, isEdit = false) {
//   try {
//     const res = await apiGet("/admin", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const admins = res.data || res;

//     const duplicateEmail = admins.find(
//       (a) =>
//         a.email.toLowerCase() === form.email.toLowerCase() &&
//         (!isEdit || a.id !== form.id)
//     );

//     if (duplicateEmail) {
//       return {
//         valid: false,
//         message: "❌ This email is already registered for another admin.",
//       };
//     }

//     const duplicatePhone = admins.find(
//       (a) =>
//         String(a.phone) === String(form.phone) &&
//         (!isEdit || a.id !== form.id)
//     );

//     if (duplicatePhone) {
//       return {
//         valid: false,
//         message: "❌ This phone number is already registered for another admin.",
//       };
//     }

//     return { valid: true };
//   } catch (err) {
//     console.error("Uniqueness check failed:", err);
//     return { valid: false, message: "⚠️ Could not verify duplicates." };
//   }
// }
export async function checkAdminUniqueness(form, token, adminId = null) {
  try {
    const res = await apiGet("/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const admins = res.data || res;

    const duplicateEmail = admins.find(
      (a) =>
        a.email.toLowerCase() === form.email.toLowerCase() &&
        String(a.id) !== String(adminId)
    );

    if (duplicateEmail) {
      return {
        valid: false,
        message: "❌ This email is already registered for another admin.",
      };
    }

    const duplicatePhone = admins.find(
      (a) =>
        String(a.phone) === String(form.phone) &&
        String(a.id) !== String(adminId)
    );

    if (duplicatePhone) {
      return {
        valid: false,
        message: "❌ This phone number is already registered for another admin.",
      };
    }

    return { valid: true };
  } catch (err) {
    console.error("Uniqueness check failed:", err);
    return { valid: false, message: "⚠️ Could not verify duplicates." };
  }
}

export function validateTempleForm(form) {
  // Required fields
  if (!form.name || !form.location) {
    return { valid: false, message: "❌ Please fill all required fields" };
  }

  // Name validation: letters & spaces only, at least 3 chars
  if (!/^[A-Za-z ]{3,}$/.test(form.name)) {
    return {
      valid: false,
      message: "❌ Temple Name must contain only letters and be at least 3 characters",
    };
  }
// Phone validation: exactly 10 digits
  if (!/^\d{10}$/.test(form.phone)) {
    return { valid: false, message: "❌ Phone number must be exactly 10 digits" };
  }
  // Optional: description length check
  if (form.description && form.description.length > 250) {
    return {
      valid: false,
      message: "❌ Description cannot exceed 250 characters",
    };
  }

  return { valid: true };
}

export async function checkTemplePhoneExists(phone, id = null) {
  if (!phone) return false;
  try {
    const res = await apiGet("/temples");
    const temples = res.data || res;

    const exists = temples.some(
      (t) => String(t.phone) === String(phone) && String(t.id) !== String(id)
    );
    return exists;
  } catch (err) {
    console.error("Phone check failed:", err);
    return false;
  }
}