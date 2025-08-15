// ✅ Step 3: Add Session Management and Personalization // 📄 File: src/utils/auth.js

export const saveUserToSession = (email) => {
  localStorage.setItem("userEmail", email);
};

export const getUserFromSession = () => {
  return localStorage.getItem("userEmail");
};

export const clearSession = () => {
  localStorage.removeItem("userEmail");
};
