import { useState } from "react";
import { submitToWaitlist } from "../utils/waitlist";

export default function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const result = await submitToWaitlist(form);

      if (result.success) {
        setFeedback({
          type: "success",
          message: result.message || "Successfully joined the waitlist.",
        });
        setForm({ name: "", email: "", phone: "" });
        return;
      }

      if (result.status === 409) {
        setFeedback({
          type: "info",
          message: "You're already on the waitlist!",
        });
      } else if (result.status === 400) {
        setFeedback({
          type: "error",
          message: result.message || "Please check your details and try again.",
        });
      } else {
        setFeedback({
          type: "error",
          message: "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Waitlist submit failed:", error);
      setFeedback({
        type: "error",
        message: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const messageColor =
    feedback.type === "success"
      ? "green"
      : feedback.type === "info"
        ? "blue"
        : "red";

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <input
        type="text"
        name="name"
        placeholder="Your full name"
        value={form.name}
        onChange={handleChange}
        disabled={isLoading}
        required
        minLength={2}
      />
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={handleChange}
        disabled={isLoading}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number (optional)"
        value={form.phone}
        onChange={handleChange}
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Joining..." : "Join the Waitlist"}
      </button>

      {feedback.message && (
        <p role="status" aria-live="polite" style={{ color: messageColor }}>
          {feedback.message}
        </p>
      )}
    </form>
  );
}
