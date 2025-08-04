import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const SellCrop = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [form, setForm] = useState({
    crop: "",
    variety: "",
    quantity: "",
    price: "",
    location: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in");

    try {
      await addDoc(collection(db, "crops"), {
        ...form,
        sellerId: user.uid,
        sellerName: user.name || user.phone || "Anonymous",
        contact: user.phone || user.email || "",
        createdAt: Timestamp.now()
      });
      setMessage("Crop listed successfully!");
      setForm({ crop: "", variety: "", quantity: "", price: "", location: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit crop");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">{t("sell_crop")}</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="crop" value={form.crop} onChange={handleChange} placeholder={t("crop_name")} className="w-full p-2 border rounded" required />
        <input name="variety" value={form.variety} onChange={handleChange} placeholder={t("variety")} className="w-full p-2 border rounded" />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder={t("quantity")} className="w-full p-2 border rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder={t("price")} className="w-full p-2 border rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder={t("location")} className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder={t("description")} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">{t("submit_crop")}</button>
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default SellCrop;