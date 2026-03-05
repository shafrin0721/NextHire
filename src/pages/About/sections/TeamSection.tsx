import { Card, CardContent } from "../../../components/ui/card";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";

const teamMembers = [
  {
    name: "Sandra Johnson",
    role: "Chief Executive Officer",
    location: "San Francisco, CA",
  },
  {
    name: "Michael Chen",
    role: "Head of Product",
    location: "New York, NY",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of People",
    location: "Austin, TX",
  },
  {
    name: "Daniel Thompson",
    role: "Engineering Manager",
    location: "Remote",
  },
  {
    name: "Amelia Davis",
    role: "Senior Recruiter",
    location: "Chicago, IL",
  },
  {
    name: "James Walker",
    role: "Marketing Lead",
    location: "Los Angeles, CA",
  },
  {
    name: "Anita Kumar",
    role: "Customer Success Lead",
    location: "Toronto, CA",
  },
  {
    name: "Robert Martinez",
    role: "Data Analyst",
    location: "Seattle, WA",
  },
];

export const TeamSection = (): JSX.Element => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-[1120px]">
        <div className="text-center mb-10">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-3xl md:text-4xl tracking-[-0.50px] leading-tight mb-2">
            Meet Our Team
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base md:text-lg tracking-[-0.50px] leading-7">
            Talented professionals, united by a shared commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="bg-[#f3e8ff] rounded-2xl border-0 shadow-[0px_8px_24px_rgba(15,23,42,0.10)]"
            >
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <Avatar className="w-16 h-16 bg-indigo-500/20">
                  <AvatarFallback className="[font-family:'Inter',Helvetica] font-semibold text-indigo-700">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <div className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-base tracking-[-0.50px] leading-6">
                    {member.name}
                  </div>
                  <div className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[-0.50px] leading-5">
                    {member.role}
                  </div>
                  <div className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs tracking-[-0.50px] leading-5 mt-1">
                    {member.location}
                  </div>
                </div>

                <button className="mt-2 inline-flex items-center justify-center w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm [font-family:'Inter',Helvetica] font-medium tracking-[-0.50px]">
                  View Profile
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

