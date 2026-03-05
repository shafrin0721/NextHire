import { FormEvent, useState } from "react";
import { Send, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export const ContactFormSection = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (message.length < 10) {
      setError("Message must be at least 10 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/NextHire/api/contact.php",
        {
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success || response.data.status === "success") {
        setSuccess(true);
        setError("");
        
        // Clear form
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");

        // Auto-hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.data.message || "Failed to send message");
      }
    } catch (err: any) {
      console.error("Contact form error:", err);
      if (err.response) {
        setError(err.response.data?.message || "Failed to send message");
      } else if (err.request) {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-[1120px] grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 items-start">
        <div>
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-2xl md:text-3xl tracking-[-0.50px] leading-tight mb-2">
            Send Us a Message
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm md:text-base tracking-[-0.50px] leading-6 mb-6">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white rounded-2xl shadow-[0px_12px_30px_rgba(15,23,42,0.10)] p-6"
          >
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="[font-family:'Inter',Helvetica] text-sm text-red-800">
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="[font-family:'Inter',Helvetica] text-sm text-green-800">
                  Thank you for contacting us! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-name"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact-name"
                  placeholder="John Doe"
                  className="h-11 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-email"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-11 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-subject"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact-subject"
                  placeholder="How can we help?"
                  className="h-11 rounded-lg"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-message"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Message <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[140px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white [font-family:'Inter',Helvetica] font-medium text-sm tracking-[-0.50px] inline-flex items-center justify-center gap-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <Send className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </div>

        <div className="hidden lg:block h-full min-h-[500px]">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0px_20px_50px_rgba(15,23,42,0.10)] border border-gray-100">
            <img
              src="contact-support.png"
              alt="Contact Support Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

