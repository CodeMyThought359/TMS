const UserTypeModel = require("../models/usertypeModel");

const UserTypeController = {
  // GET all
  getAllUserTypes: async (req, res) => {
    try {
      const roles = await UserTypeModel.getAll();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET single by ID
  getUserTypeById: async (req, res) => {
    try {
      const role = await UserTypeModel.getById(req.params.id);
      if (!role) return res.status(404).json({ error: "User role not found" });
      res.json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST create
  // createUserType: async (req, res) => {
  //   try {
  //     const { name, description, temple_id, user_email, user_password } = req.body;
     
  //     if (!name) return res.status(400).json({ error: "Name is required" });

  //     const result = await UserTypeModel.create({ name, description, temple_id, user_email, user_password });
  //     res.status(201).json({ message: "User role created", id: result.insertId });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // },
  // POST /user-type
createUserType: async (req, res) => {
  try {
    const { name,user_name, description, temple_id, user_email, user_password } = req.body;

    // ✅ Validate required fields
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!temple_id) return res.status(400).json({ error: "Temple ID is required" });
if(!user_name) return res.status(400).json({ error: "User Name is required" });
    // If email/password is provided, hash the password
    let hashedPassword = null;
    if (user_email && user_password) {
      const bcrypt = require("bcryptjs");
      hashedPassword = await bcrypt.hash(user_password, 10); // 10 rounds of salt
    }

    // Prepare the data to insert
    const dataToInsert = {
      name,
      user_name,
      description: description || null,
      temple_id,
      user_email: user_email || null,
      user_password: hashedPassword,
    };

    // Create the user type in DB
    const result = await UserTypeModel.create(dataToInsert); 
    // result.insertId contains the newly created ID

    res.status(201).json({ message: "User type created", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
},


  // PUT update
  updateUserType: async (req, res) => {
    try {
      const { name, description, temple_id } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });

      await UserTypeModel.update(req.params.id, { name, description, temple_id });
      res.json({ message: "User role updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE
  // deleteUserType: async (req, res) => {
  //   try {
  //     await UserTypeModel.delete(req.params.id);
  //     res.json({ message: "User role deleted" });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // },
  deleteUserType: async (req, res) => {
  try {
    const result = await UserTypeModel.delete(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User role not found" });
    }

    res.json({ message: "User role deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

};

module.exports = UserTypeController;
