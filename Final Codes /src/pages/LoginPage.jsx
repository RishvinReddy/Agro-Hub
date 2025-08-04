import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      alert("Google Sign-in Failed");
      console.error(error);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: () => {},
      }, auth);
    }
  };

  const handleSendOTP = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(auth, "+91" + phone, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP Sent!");
    } catch (err) {
      alert("OTP sending failed");
      console.error(err);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid OTP");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">{t("login")}</h1>

      <button
        onClick={handleGoogleLogin}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {t("sign_in_with_google")}
      </button>

      <div className="w-full max-w-sm">
        <label className="block mb-2">{t("enter_phone")}</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="9876543210"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSendOTP}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {t("send_otp")}
        </button>

        {confirmationResult && (
          <div className="mt-4">
            <label className="block mb-2">{t("enter_otp")}</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
            >
              {t("verify_otp")}
            </button>
          </div>
        )}
      </div>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPage;