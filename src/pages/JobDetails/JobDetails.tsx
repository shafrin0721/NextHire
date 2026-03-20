import { useParams } from "react-router-dom";
import { JobDetailsMainSection } from "./sections/JobDetailsMainSection";
import { SimilarJobsSection } from "./sections/SimilarJobsSection";
import { getJobById } from "../../services/data/jobs";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const JobDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const job = getJobById(id);

  if (!job) {
    return (
      <div className="flex flex-col w-full bg-white">
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
          <h1 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-xl mb-2">
            Job not found
          </h1>
          <p className="text-gray-600 mb-6">This job may have been removed or the link is incorrect.</p>
          <Button asChild className="rounded-lg">
            <Link to="/jobs">Browse jobs</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white">
      <JobDetailsMainSection job={job} />
      <SimilarJobsSection currentJobId={job.id} />
    </div>
  );
};
