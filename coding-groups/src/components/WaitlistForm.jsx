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

  const messageStyles = {
    success: "text-green-600 bg-green-50",
    error: "text-red-600 bg-red-50",
    info: "text-blue-600 bg-blue-50"
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="text"
        name="name"
        placeholder="Your full name"
        value={form.name}
        onChange={handleChange}
        disabled={isLoading}
        required
        minLength={2}
        className="min-h-[3rem] px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-orange focus:outline-none focus:ring-2 focus:ring-primary-orange/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
      />
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={handleChange}
        disabled={isLoading}
        required
        className="min-h-[3rem] px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-orange focus:outline-none focus:ring-2 focus:ring-primary-orange/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number (optional)"
        value={form.phone}
        onChange={handleChange}
        disabled={isLoading}
        className="min-h-[3rem] px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-orange focus:outline-none focus:ring-2 focus:ring-primary-orange/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="min-h-[3.5rem] px-6 py-3 rounded-lg bg-primary-orange text-white font-bold text-sm md:text-base hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
      >
        {isLoading ? "Joining..." : "Join the Waitlist"}
      </button>

      {feedback.message && (
        <p
          role="status"
          aria-live="polite"
          className={`px-4 py-3 rounded-lg text-sm font-medium ${messageStyles[feedback.type] || messageStyles.error}`}
        >
          {feedback.message}
        </p>
      )}
    </form>
  );
}
