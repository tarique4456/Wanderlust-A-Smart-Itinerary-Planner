// // 📁 src/pages/Register.js

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Auth.css";
// import { FaUserPlus } from "react-icons/fa";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMsg("");

//     try {
//       const res = await fetch("http://localhost:8080/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (res.ok) {
//         setMsg("✅ Registration successful!");
//         setTimeout(() => {
//           navigate("/login");
//         }, 1500);
//       } else {
//         const err = await res.text();
//         setMsg("❌ " + err);
//       }
//     } catch (err) {
//       setMsg("Registration failed.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>
//         <FaUserPlus /> Register
//       </h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           name="name"
//           autoComplete="name"
//           placeholder="👤 Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           autoComplete="email"
//           placeholder="📧 Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           autoComplete="new-password"
//           placeholder="🔒 Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Create Account</button>
//       </form>
//       <p>{msg}</p>
//     </div>
//   );
// };

// export default Register;

// 📁 src/pages/Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // ✅ NEW
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }), // ✅ Include phone
      });

      if (res.ok) {
        setMsg("✅ Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const err = await res.text();
        setMsg("❌ " + err);
      }
    } catch (err) {
      setMsg("Registration failed.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>
        <FaUserPlus /> Register
      </h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="👤 Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="📞 Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Register;
