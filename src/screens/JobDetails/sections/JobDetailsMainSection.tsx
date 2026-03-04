import {
  Briefcase as BriefcaseIcon,
  CheckCircle2 as CheckCircleIcon,
  Clock as ClockIcon,
  DollarSign as DollarSignIcon,
  MapPin as MapPinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

const requirements = [
  "5+ years of experience in frontend development.",
  "Expert knowledge of React.js and modern JavaScript (ES6+).",
  "Strong experience with CSS3, HTML5, and responsive design.",
  "Experience with state management libraries (Redux, Zustand).",
  "Familiarity with RESTful APIs, Webpack, and version control (Git).",
  "Strong problem-solving skills and attention to detail.",
  "Bachelor's degree in Computer Science or related field.",
];

const skills = [
  "React.js",
  "TypeScript",
  "Redux",
  "REST APIs",
  "Tailwind CSS",
  "Jest",
  "CI/CD",
  "Agile",
];

const benefits = [
  "Comprehensive health insurance",
  "Learning & development budget",
  "Equity participation",
  "Remote work flexibility",
  "Unlimited PTO",
  "Free meals & snacks",
];

export const JobDetailsMainSection = (): JSX.Element => {
  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-[1120px] flex flex-col gap-6">
        <Card className="rounded-2xl border border-gray-100 shadow-[0px_14px_40px_rgba(15,23,42,0.12)] bg-white">
          <CardContent className="p-6 md:p-8 flex flex-col gap-6">
            <header className="flex flex-col gap-4 border-b border-gray-100 pb-4 md:pb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex gap-3 md:gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BriefcaseIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-xl md:text-2xl tracking-[-0.50px] leading-7 md:leading-8">
                      Senior Frontend Developer
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                      <span>TechCorp Solutions</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="[font-family:'Inter',Helvetica] font-semibold text-emerald-500 text-lg md:text-xl">
                    $120k – $150k
                  </div>
                  <div className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                    per year
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs md:text-sm [font-family:'Inter',Helvetica] text-gray-600">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
                  <BriefcaseIcon className="w-4 h-4 text-gray-500" />
                  <span>Full-time</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
                  <ClockIcon className="w-4 h-4 text-gray-500" />
                  <span>5+ years experience</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span>Hybrid · San Francisco</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
                  <ClockIcon className="w-4 h-4 text-gray-500" />
                  <span>Posted 2 days ago</span>
                </div>
              </div>
            </header>

            <section className="space-y-6 text-sm md:text-base text-gray-700 [font-family:'Inter',Helvetica] leading-relaxed">
              <div>
                <h2 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                  Job Description
                </h2>
                <p className="mb-3">
                  We are seeking a talented Senior Frontend Developer to join our growing
                  team. In this role, you will be responsible for developing and
                  maintaining high-quality web applications using modern frontend
                  technologies.
                </p>
                <p className="mb-3">
                  As a Senior Frontend Developer, you will lead frontend architecture
                  decisions, mentor junior developers, and contribute to our engineering
                  culture. You&apos;ll have the opportunity to work on challenging
                  projects that impact thousands of users.
                </p>
                <p>
                  This is an excellent opportunity for someone who is passionate about
                  frontend development and wants to work in a fast-paced, innovative
                  environment with cutting-edge technologies.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {requirements.map((item) => (
                    <li key={item} className="flex gap-2 items-start">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                  What We Offer
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                  <div className="font-medium text-gray-900 mb-1">
                    Ready to apply?
                  </div>
                  <p>
                    Join our team and help us build amazing products for millions of
                    users.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="h-10 px-4 rounded-lg text-sm [font-family:'Inter',Helvetica]"
                  >
                    Save Job
                  </Button>
                  <Button
                    asChild
                    className="h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm [font-family:'Inter',Helvetica]"
                  >
                    <Link to="/assessment/frontend-developer">Apply Now</Link>
                  </Button>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

