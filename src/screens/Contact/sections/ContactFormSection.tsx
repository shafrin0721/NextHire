import { FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export const ContactFormSection = (): JSX.Element => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-name"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Full Name
                </Label>
                <Input
                  id="contact-name"
                  placeholder="John Doe"
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-email"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Email Address
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-phone"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Phone Number (Optional)
                </Label>
                <Input
                  id="contact-phone"
                  placeholder="+1 (555) 123-4567"
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-subject"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Subject
                </Label>
                <Input
                  id="contact-subject"
                  placeholder="How can we help?"
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="contact-message"
                  className="[font-family:'Inter',Helvetica] text-sm text-gray-800"
                >
                  Message
                </Label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[140px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white [font-family:'Inter',Helvetica] font-medium text-sm tracking-[-0.50px] inline-flex items-center justify-center gap-2 px-8"
            >
              <span>Send Message</span>
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

