import { Card, CardContent } from "../../../components/ui/card";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Shafrin",
    role: "UI/UX & Full Stack",
    responsibilities: "Designed UI, integrated frontend and backend",
    image: "/shafrin.png",
    linkedin: "#",
    email: "#"
  },
  {
    name: "Heli",
    role: "Database & QA Testing",
    responsibilities: "Setup XAMPP and managed MySQL database, conducted testing and testcases, Report handling",
    image: "/heli.jpg",
    linkedin: "#",
    email: "#"
  },
  {
    name: "Thushalini",
    role: "Frontend Development",
    responsibilities: "Developed pages using React.js",
    image: "/thushalini .jpeg",
    linkedin: "#",
    email: "#"
  },
  {
    name: "Sandalu",
    role: "Backend Development",
    responsibilities: "Developed PHP REST APIs, server-side logic",
    image: "/sandalu.jpg",
    linkedin: "#",
    email: "#"
  },
];

export const TeamSection = (): JSX.Element => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="text-center mb-16">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-4xl md:text-5xl tracking-[-0.50px] leading-tight mb-4">
            Meet Our Team
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-lg md:text-xl tracking-[-0.50px] leading-7 max-w-2xl mx-auto">
            The talented professionals who built NextHire, united by a shared commitment to revolutionizing recruitment.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className="bg-white rounded-3xl border-0 shadow-[0px_12px_40px_rgba(15,23,42,0.12)] hover:shadow-[0px_20px_60px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-3 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Social icons on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <a href={member.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${member.email}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-xl tracking-[-0.50px] leading-6 mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="[font-family:'Inter',Helvetica] font-semibold text-blue-600 text-sm tracking-[-0.50px] leading-5 mb-3">
                    {member.role}
                  </p>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs tracking-[-0.50px] leading-5">
                    {member.responsibilities}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
