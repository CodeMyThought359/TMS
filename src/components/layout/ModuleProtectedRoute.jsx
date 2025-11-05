import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // <-- make sure you installed this
import { apiGet } from "../../utils/helpers";

const ModuleProtectedRoute = ({ moduleName }) => {
  const token = localStorage.getItem("token");
  const [allowed, setAllowed] = useState(null); // null = loading
  const [error, setError] = useState(null);

  // ✅ Decode temple_id from JWT token
  let temple_id = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      temple_id = decoded.temple_id; // <-- extract temple_id here
      if (!temple_id) {
        console.warn("⚠️ temple_id not found in token payload");
      }
    } catch (err) {
      console.error("❌ Invalid or malformed token:", err);
    }
  } else {
    console.warn("⚠️ No token found — redirecting to login");
    return <Navigate to="/login" replace />;
  }

  const checkModule = async () => {
    if (!temple_id) {
      setError("Temple ID not found in token");
      setAllowed(false);
      return;
    }

    try {
      // ✅ 1️⃣ Get all available modules
      const modulesRes = await apiGet("/modules");
      const allModules = modulesRes.data || modulesRes;

      // ✅ 2️⃣ Find the target module
      const moduleObj = allModules.find(
        (m) => m.name.toLowerCase() === moduleName.toLowerCase()
      );

      if (!moduleObj) {
        console.warn(`⚠️ Module "${moduleName}" not found in system`);
        setAllowed(false);
        return;
      }

      // ✅ 3️⃣ Fetch temple-specific modules using temple_id from token
      const templeModulesRes = await apiGet(`/templeModules/${temple_id}`);
      const assignedModules = templeModulesRes.data || templeModulesRes;

      // ✅ 4️⃣ Check if module is enabled
      const modStatus = assignedModules.find(
        (m) => m.module_id === moduleObj.id
      );

      setAllowed(modStatus?.is_enabled === 1);
    } catch (err) {
      console.error("Module access check failed:", err);
      setError("Failed to verify module access");
      setAllowed(false);
    }
  };

  useEffect(() => {
    checkModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleName]);

  // ✅ Loading
  if (allowed === null) {
    return <div className="p-6">⏳ Checking access permission...</div>;
  }

  // ✅ Error
  if (error) {
    return <div className="p-6 text-red-600">⚠️ {error}</div>;
  }

  // ✅ Denied
  if (!allowed) {
    return (
      <div className="p-6 text-red-600">
        ❌ Access denied — The <b>{moduleName}</b> module is not enabled for this temple.
      </div>
    );
  }

  // ✅ Allowed
  return <Outlet />;
};

export default ModuleProtectedRoute;
