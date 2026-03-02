// src/components/WaitlistForm.jsx
import { useState } from "react";
import { submitToWaitlist } from "../utils/waitlist";

export default function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "duplicate" | "error"
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const result = await submitToWaitlist(form);

    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setForm({ name: "", email: "", phone: "" }); // Reset form
    } else if (result.status === 409) {
      setStatus("duplicate");
      setMessage("You're already on the waitlist! We'll be in touch soon. 😊");
    } else if (result.status === 400) {
      setStatus("error");
      setMessage(result.message); // Show the validation error (e.g., "Invalid phone number")
    } else {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input
        type="text"
        name="name"
        placeholder="Your full name"
        value={form.name}
        onChange={handleChange}
        required
        minLength={2}
      />
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number (optional)"
        value={form.phone}
        onChange={handleChange}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining..." : "Join the Waitlist"}
      </button>

      {/* Feedback Messages */}
      {status === "success"   && <p style={{ color: "green" }}>✅ {message}</p>}
      {status === "duplicate" && <p style={{ color: "blue" }}>ℹ️ {message}</p>}
      {status === "error"     && <p style={{ color: "red" }}>❌ {message}</p>}
    </form>
  );
}
