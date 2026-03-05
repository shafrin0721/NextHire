import { type FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { getJobById } from "../../services/data/jobs";
import { validateRequired, validateEmail, validatePhone } from "../../utils/validation";

export const Apply = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = getJobById(id);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    file?: string;
  }>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullNameError = validateRequired(fullName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const fileError = validateRequired(file ? "selected" : "");
    if (fullNameError || emailError || phoneError || fileError) {
      setErrors({
        fullName: fullNameError ?? undefined,
        email: emailError ?? undefined,
        phone: phoneError ?? undefined,
        file: fileError ?? undefined,
      });
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      navigate(`/job-details/${id}`);
    }, 2000);
  };

  if (!job) {
    return (
      <div className="flex flex-col w-full bg-white min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
          <h1 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-xl mb-2">
            Job not found
          </h1>
          <p className="text-gray-600 mb-6">This job may have been removed or the link is incorrect.</p>
          <Button className="rounded-lg" onClick={() => navigate("/jobs")}>
            Browse jobs
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col w-full bg-white min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-md text-center">
            <h1 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-2xl mb-2">
              Application submitted
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for applying for <strong>{job.title}</strong>. We&apos;ll be in touch soon.
            </p>
            <Button className="rounded-lg" onClick={() => navigate(`/job-details/${id}`)}>
              Back to job details
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-[560px]">
          <div className="mb-8">
            <h1 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-2xl tracking-[-0.50px] leading-8 mb-1">
              Apply for {job.title}
            </h1>
            <p className="[font-family:'Inter',Helvetica] text-gray-600 text-base">
              {job.company} · {job.location}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-[0px_14px_40px_rgba(15,23,42,0.08)] p-6 md:p-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`h-12 rounded-xl border-gray-300 [font-family:'Inter',Helvetica] ${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 rounded-xl border-gray-300 [font-family:'Inter',Helvetica] ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`h-12 rounded-xl border-gray-300 [font-family:'Inter',Helvetica] ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="cv" className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm">
                Upload CV
              </Label>
              <Input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  setFile(e.target.files?.[0] ?? null);
                  if (errors.file) setErrors((prev) => ({ ...prev, file: undefined }));
                }}
                className={`h-12 rounded-xl border-gray-300 [font-family:'Inter',Helvetica] file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 ${errors.file ? "border-red-500" : ""}`}
              />
              {errors.file && <p className="text-sm text-red-600">{errors.file}</p>}
              <p className="text-xs text-gray-500">PDF or Word document, max 5MB</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white [font-family:'Inter',Helvetica] font-medium text-base"
              >
                Submit Application
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl [font-family:'Inter',Helvetica]"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
