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
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    Icon: ShieldCheckIcon,
    title: "Integrity",
    description: "We act with honesty and transparency in everything we do.",
    gradient: "from-green-400 to-teal-500"
  },
  {
    Icon: UsersIcon,
    title: "Collaboration",
    description: "We partner closely with clients and candidates alike.",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    Icon: SparklesIcon,
    title: "Excellence",
    description: "We hold ourselves to the highest standards of quality.",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    Icon: Globe2Icon,
    title: "Sustainability",
    description: "We build relationships and products that last.",
    gradient: "from-emerald-400 to-green-500"
  },
  {
    Icon: LineChartIcon,
    title: "Growth",
    description: "We support ongoing learning and career development.",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    Icon: HandshakeIcon,
    title: "Trust",
    description: "We earn trust through consistent, reliable results.",
    gradient: "from-amber-400 to-yellow-500"
  },
  {
    Icon: HeartHandshakeIcon,
    title: "Passion",
    description: "We genuinely care about people and their careers.",
    gradient: "from-rose-400 to-red-500"
  },
];

export const CoreValuesSection = (): JSX.Element => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="text-center mb-16">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-4xl md:text-5xl tracking-[-0.50px] leading-tight mb-4">
            Our Core Values
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-lg md:text-xl tracking-[-0.50px] leading-7 max-w-2xl mx-auto">
            The principles that guide everything we do and define who we are as a company.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ Icon, title, description, gradient }, index) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-4 rounded-3xl border border-gray-100 bg-white px-8 py-8 shadow-[0px_8px_32px_rgba(15,23,42,0.08)] hover:shadow-[0px_16px_48px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <Icon className="w-8 h-8" />
              </div>
              <div className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-lg tracking-[-0.50px] leading-6 group-hover:text-blue-600 transition-colors">
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

