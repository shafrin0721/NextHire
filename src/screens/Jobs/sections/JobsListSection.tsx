import {
  BriefcaseIcon,
  ClockIcon,
  DollarSignIcon,
  MapPinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k – $150k",
    type: "Full-time · Hybrid",
    level: "Senior",
    posted: "2 days ago",
    path: "/jobs/senior-frontend-developer",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignStudio",
    location: "Remote",
    salary: "$95k – $120k",
    type: "Full-time · Remote",
    level: "Mid-level",
    posted: "4 days ago",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudScale",
    location: "New York, NY",
    salary: "$130k – $160k",
    type: "Full-time · On-site",
    level: "Senior",
    posted: "1 week ago",
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "Chicago, IL",
    salary: "$80k – $105k",
    type: "Full-time · Hybrid",
    level: "Mid-level",
    posted: "3 days ago",
  },
  {
    id: 5,
    title: "Customer Success Specialist",
    company: "Connectly",
    location: "Remote",
    salary: "$60k – $75k",
    type: "Full-time · Remote",
    level: "Entry",
    posted: "5 days ago",
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Insight Labs",
    location: "Austin, TX",
    salary: "$90k – $110k",
    type: "Full-time · On-site",
    level: "Mid-level",
    posted: "1 week ago",
  },
];

export const JobsListSection = (): JSX.Element => {
  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-[1120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0px_10px_24px_rgba(15,23,42,0.08)]"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-lg tracking-[-0.50px] leading-6">
                      {job.title}
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[-0.50px] leading-5">
                      {job.company}
                    </p>
                  </div>
                  <span className="[font-family:'Inter',Helvetica] text-xs text-blue-600 bg-blue-50 rounded-full px-3 py-1 font-medium">
                    {job.level}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    <span className="[font-family:'Inter',Helvetica]">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-4 h-4 text-gray-500" />
                    <span className="[font-family:'Inter',Helvetica]">
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-4 h-4 text-gray-500" />
                    <span className="[font-family:'Inter',Helvetica]">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ClockIcon className="w-4 h-4" />
                    <span className="[font-family:'Inter',Helvetica]">
                      Posted {job.posted}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {job.path ? (
                      <Button
                        asChild
                        variant="outline"
                        className="h-9 px-4 rounded-lg text-sm [font-family:'Inter',Helvetica]"
                      >
                        <Link to={job.path}>View Details</Link>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="h-9 px-4 rounded-lg text-sm [font-family:'Inter',Helvetica]"
                      >
                        View Details
                      </Button>
                    )}
                    <Button className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm [font-family:'Inter',Helvetica]">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm [font-family:'Inter',Helvetica] text-gray-700 hover:bg-gray-50">
            Load more positions
          </button>
        </div>
      </div>
    </section>
  );
};

