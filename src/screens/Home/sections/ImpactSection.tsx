const impactStats = [
  {
    icon: "/div-2.svg",
    value: "15K+",
    label: "Active Jobs",
  },
  {
    icon: "/div-14.svg",
    value: "50K+",
    label: "Registered Candidates",
  },
  {
    icon: "/div-5.svg",
    value: "2K+",
    label: "Partner Companies",
  },
  {
    icon: "/div-6.svg",
    value: "25K+",
    label: "Successful Placements",
  },
];

export const ImpactSection = (): JSX.Element => {
  return (
    <div className="bg-blue-600 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl tracking-[-0.50px] leading-10 mb-4">
            Our Impact
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-xl tracking-[-0.50px] leading-7">
            Connecting talent with opportunity worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                className="w-16 h-16 mb-4"
                alt={stat.label}
                src={stat.icon}
              />
              <div className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl tracking-[-0.50px] leading-[44px] mb-2">
                {stat.value}
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-base tracking-[-0.50px] leading-5 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
