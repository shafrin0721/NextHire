import { JobCard } from "../../../components/JobCard";
import { getJobsList } from "../../../services/data/jobs";

const jobs = getJobsList();

export const JobsListSection = ({ searchQuery = "" }): JSX.Element => {
  
  // 🔥 FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.type.toLowerCase().includes(query) ||
      job.level.toLowerCase().includes(query)
    );
  });

  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-[1120px]">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job as any} />
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-500">
              No jobs found
            </p>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50">
            Load more positions
          </button>
        </div>

      </div>
    </section>
  );
};