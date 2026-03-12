import { Card, CardContent } from "../../../components/ui/card";
import { Target, Eye, CheckCircle } from "lucide-react";

const cards = [
  {
    title: "Our Mission",
    icon: Target,
    description:
      "To build a trusted platform that simplifies job discovery for candidates and talent discovery for employers, while delivering a delightful experience for everyone involved.",
    points: [
      "Empowering job seekers with transparent, high-quality opportunities.",
      "Helping companies reach the right talent quickly and efficiently.",
      "Using technology to make hiring more human and impactful.",
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Our Vision",
    icon: Eye,
    description:
      "To become the go-to career destination where every professional can grow, and every company can build outstanding teams with confidence.",
    points: [
      "Creating long-term, meaningful connections between people and work.",
      "Supporting diverse teams and inclusive workplaces worldwide.",
      "Continuously innovating to improve the hiring journey.",
    ],
    gradient: "from-purple-500 to-pink-500"
  },
];

export const MissionVisionSection = (): JSX.Element => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-[-100px] w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-[-100px] w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="text-center mb-16">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-4xl md:text-5xl tracking-[-0.50px] leading-tight mb-4">
            Our Purpose
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-lg md:text-xl tracking-[-0.50px] leading-7 max-w-2xl mx-auto">
            Driving innovation in recruitment with clear mission and visionary goals.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {cards.map((card, index) => (
            <Card
              key={card.title}
              className={`bg-white rounded-3xl shadow-[0px_16px_48px_rgba(15,23,42,0.12)] border-0 overflow-hidden hover:shadow-[0px_24px_64px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 group`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${card.gradient}`}></div>
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-3xl md:text-4xl tracking-[-0.50px] leading-tight">
                    {card.title}
                  </h2>
                </div>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-lg tracking-[-0.50px] leading-7 mb-6">
                  {card.description}
                </p>
                <ul className="space-y-4">
                  {card.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-6 flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${idx * 0.1}s` }}
                    >
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-br ${card.gradient} text-white rounded-full`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
