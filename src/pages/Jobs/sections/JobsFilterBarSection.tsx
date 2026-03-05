export const JobsFilterBarSection = (): JSX.Element => {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-[1120px] py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base tracking-[-0.50px] leading-5">
            24 open positions
          </div>
          <div className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs md:text-sm tracking-[-0.50px] leading-5">
            Use filters to narrow down roles by location, type, and experience
            level.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <button className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 [font-family:'Inter',Helvetica] font-medium">
            All roles
          </button>
          <button className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 [font-family:'Inter',Helvetica]">
            Full-time
          </button>
          <button className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 [font-family:'Inter',Helvetica]">
            Remote
          </button>
          <button className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 [font-family:'Inter',Helvetica]">
            Entry level
          </button>
        </div>
      </div>
    </section>
  );
};

