import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setForm(snap.data());
        }
      }
    };
    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, form);
      setMessage(t("profile_updated"));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{t("profile")}</h2>

      <div className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder={t("name")} className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder={t("email")} className="w-full p-2 border rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder={t("phone")} className="w-full p-2 border rounded" />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Farmer">{t("farmer")}</option>
          <option value="Customer">{t("customer")}</option>
        </select>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{t("save")}</button>
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;