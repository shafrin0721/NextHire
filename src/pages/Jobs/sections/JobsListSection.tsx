import { JobCard } from "../../../components/JobCard";
import { getJobsList } from "../../../services/data/jobs";

const jobs = getJobsList();

export const JobsListSection = (): JSX.Element => {
  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-[1120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job as any} />
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
