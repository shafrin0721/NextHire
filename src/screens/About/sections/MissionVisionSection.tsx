import { Card, CardContent } from "../../../components/ui/card";

const cards = [
  {
    title: "Our Mission",
    description:
      "To build a trusted platform that simplifies job discovery for candidates and talent discovery for employers, while delivering a delightful experience for everyone involved.",
    points: [
      "Empowering job seekers with transparent, high‑quality opportunities.",
      "Helping companies reach the right talent quickly and efficiently.",
      "Using technology to make hiring more human and impactful.",
    ],
  },
  {
    title: "Our Vision",
    description:
      "To become the go‑to career destination where every professional can grow, and every company can build outstanding teams with confidence.",
    points: [
      "Creating long‑term, meaningful connections between people and work.",
      "Supporting diverse teams and inclusive workplaces worldwide.",
      "Continuously innovating to improve the hiring journey.",
    ],
  },
];

export const MissionVisionSection = (): JSX.Element => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-[1120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="bg-white rounded-2xl shadow-[0px_10px_30px_rgba(15,23,42,0.10)] border-0"
            >
              <CardContent className="p-8">
                <h2 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-2xl md:text-3xl tracking-[-0.50px] leading-snug mb-3">
                  {card.title}
                </h2>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base md:text-lg tracking-[-0.50px] leading-7 mb-4">
                  {card.description}
                </p>
                <ul className="space-y-2 text-left list-disc list-inside">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm md:text-base tracking-[-0.50px] leading-6"
                    >
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

