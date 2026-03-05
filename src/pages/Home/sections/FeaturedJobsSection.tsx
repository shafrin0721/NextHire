import { Clock as ClockIcon, DollarSign as DollarSignIcon, MapPin as MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { getJobsList } from "../../../services/data/jobs";

const logos = ["/div-7.svg", "/div-8.svg", "/div-4.svg"];
const jobListings = getJobsList()
  .slice(0, 3)
  .map((job, i) => ({ ...job, logo: logos[i] ?? "/div-7.svg" }));

export const FeaturedJobsSection = (): JSX.Element => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-800 text-4xl tracking-[-0.50px] leading-10 mb-4">
            Featured Job Opportunities
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xl tracking-[-0.50px] leading-7">
            Discover exciting career opportunities from leading companies
            <br />
            worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {jobListings.map((job) => (
            <Card
              key={job.id}
              className="bg-white rounded-xl shadow-[0px_10px_15px_#0000001a,0px_4px_6px_#0000001a] border-0"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex gap-4">
                  <img
                    className="w-12 h-12"
                    alt={job.company}
                    src={job.logo}
                  />
                  <div className="flex flex-col">
                    <h3 className="[font-family:'Inter',Helvetica] font-normal text-gray-800 text-xl tracking-[-0.50px] leading-7">
                      {job.title}
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-6">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-3 h-6 text-gray-600" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-6">
                      {job.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-2.5 h-6 text-gray-600" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-6">
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-6 text-gray-600" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-6">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 h-12 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]"
                  >
                    <Link to={`/job-details/${job.id}`}>View Details</Link>
                  </Button>
                  <Button
                    asChild
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]"
                  >
                    <Link to={`/apply/${job.id}`}>Apply Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]">
            <Link to="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
