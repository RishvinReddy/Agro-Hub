import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";

const Forum = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [question, setQuestion] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "forum"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });
    return () => unsub();
  }, []);

  const handlePost = async () => {
    if (!user) return alert("Login required to post");
    if (!question.trim()) return;
    try {
      await addDoc(collection(db, "forum"), {
        text: question,
        author: user.name || user.phone || "Anonymous",
        uid: user.uid,
        createdAt: Timestamp.now()
      });
      setQuestion("");
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">{t("community_forum")}</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={t("ask_question")}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t("post")}
      </button>

      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">{post.text}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t("by")}: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;