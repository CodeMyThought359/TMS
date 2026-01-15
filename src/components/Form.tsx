import React, { useState } from "react";
import { FormData } from "../types/formData";


const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
   agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const handleSkillChange = (skill: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     skills: prev.skills.includes(skill)
  //       ? prev.skills.filter((s) => s !== skill)
  //       : [...prev.skills, skill],
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "20px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h2>Registration Form</h2>

      {/* Name */}
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Email */}
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      

      {/* Skills
      <label>Skills</label>
      <div>
        {["React", "Node", "TypeScript"].map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              checked={formData.skills.includes(skill)}
              onChange={() => handleSkillChange(skill)}
            />
            {skill}
          </label>
        ))}
      </div>

      {/* Country */}
      {/* <label>Country</label>
      <select
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
      >
        <option value="">Select Country</option>
        <option value="USA">USA</option>
        <option value="India">India</option>
        <option value="UK">UK</option>
      // </select> */} 

      {/* Agree */}
      <label>
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          required
        />
        I agree to the terms & conditions
      </label>

      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
