import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { jobs } from "../../../services/data/jobs";

interface SimilarJobsSectionProps {
  currentJobId: number;
}

export const SimilarJobsSection = ({ currentJobId }: SimilarJobsSectionProps): JSX.Element => {
  const similarJobs = jobs.filter((j) => j.id !== currentJobId).slice(0, 4);

  return (
    <section className="bg-gray-50 pb-12">
      <div className="container mx-auto px-4 max-w-[1120px] flex flex-col gap-4">
        <h2 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-base md:text-lg tracking-[-0.50px] leading-6">
          Similar Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {similarJobs.map((job) => (
            <Card
              key={job.id}
              className="rounded-2xl border border-gray-100 bg-white shadow-[0px_10px_24px_rgba(15,23,42,0.06)]"
            >
              <CardContent className="p-5 flex flex-col gap-3">
                <div>
                  <div className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base leading-5">
                    {job.title}
                  </div>
                  <div className="[font-family:'Inter',Helvetica] text-xs text-gray-500 leading-5">
                    {job.company}
                  </div>
                </div>
                <div className="[font-family:'Inter',Helvetica] text-sm text-emerald-500 font-semibold">
                  {job.salary}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-1 h-9 rounded-lg text-sm [font-family:'Inter',Helvetica]"
                >
                  <Link to={`/job-details/${job.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
