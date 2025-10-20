"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  dateAndLocation: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    dateAndLocation: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    // simple email test
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please use a valid email.";
    if (!form.dateAndLocation.trim()) return "Please enter date & location.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send message");

      setSuccessMsg("Message sent! I’ll get back to you soon.");
      setForm({ name: "", email: "", dateAndLocation: "", message: "" });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      {successMsg && (
        <div className="p-3 bg-green-100 text-green-800 rounded">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-800 rounded">{errorMsg}</div>
      )}

      <div>
        <label className="block text-[#0e3c46] text-sm font-semibold mb-1">
          Name *
        </label>
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          type="text"
          placeholder="Your name"
          required
          className="w-full border border-gray-400 rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#b66a4a]"
        />
      </div>

      <div>
        <label className="block text-[#0e3c46] text-sm font-semibold mb-1">
          Email address *
        </label>
        <input
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          type="email"
          placeholder="Your email address"
          required
          className="w-full border border-gray-400 rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#b66a4a]"
        />
      </div>

      <div>
        <label className="block text-[#0e3c46] text-sm font-semibold mb-1">
          Date and Location *
        </label>
        <input
          value={form.dateAndLocation}
          onChange={(e) => update("dateAndLocation", e.target.value)}
          type="text"
          placeholder="Your date and location"
          required
          className="w-full border border-gray-400 rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#b66a4a]"
        />
      </div>

      <div>
        <label className="block text-[#0e3c46] text-sm font-semibold mb-1">
          Message *
        </label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="Your message"
          required
          className="w-full border border-gray-400 rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#b66a4a]"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#b66a4a] disabled:opacity-60 hover:bg-[#9f5a3e] text-white px-8 py-3 uppercase text-sm font-semibold tracking-wider rounded-sm transition-colors duration-200"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
