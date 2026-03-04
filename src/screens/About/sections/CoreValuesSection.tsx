import {
  HandshakeIcon,
  HeartHandshakeIcon,
  LightbulbIcon,
  LineChartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  Globe2Icon,
} from "lucide-react";

const values = [
  {
    Icon: LightbulbIcon,
    title: "Innovation",
    description: "We constantly explore new ideas to make hiring smarter.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Integrity",
    description: "We act with honesty and transparency in everything we do.",
  },
  {
    Icon: UsersIcon,
    title: "Collaboration",
    description: "We partner closely with clients and candidates alike.",
  },
  {
    Icon: SparklesIcon,
    title: "Excellence",
    description: "We hold ourselves to the highest standards of quality.",
  },
  {
    Icon: Globe2Icon,
    title: "Sustainability",
    description: "We build relationships and products that last.",
  },
  {
    Icon: LineChartIcon,
    title: "Growth",
    description: "We support ongoing learning and career development.",
  },
  {
    Icon: HandshakeIcon,
    title: "Trust",
    description: "We earn trust through consistent, reliable results.",
  },
  {
    Icon: HeartHandshakeIcon,
    title: "Passion",
    description: "We genuinely care about people and their careers.",
  },
];

export const CoreValuesSection = (): JSX.Element => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-[1120px]">
        <div className="text-center mb-10">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-3xl md:text-4xl tracking-[-0.50px] leading-tight mb-2">
            Our Core Values
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base md:text-lg tracking-[-0.50px] leading-7">
            The principles that guide everything we do and define who we are as
            a company.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 px-6 py-6 shadow-[0px_6px_18px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-1">
                <Icon className="w-6 h-6" />
              </div>
              <div className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-base tracking-[-0.50px] leading-6">
                {title}
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[-0.50px] leading-6">
                {description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

