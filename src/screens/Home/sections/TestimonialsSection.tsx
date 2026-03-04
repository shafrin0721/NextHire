import { Card, CardContent } from "../../../components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    quote:
      '"CareerHub helped me land my dream job at a top tech company. The platform is intuitive and the job matching is incredibly accurate."',
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    quote:
      '"The quick apply feature saved me so much time. I got responses from multiple companies within days of applying."',
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "UX Designer",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    quote:
      '"As a designer, I appreciate the clean interface and user experience. Finding relevant jobs has never been easier."',
    rating: 5,
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-800 text-4xl tracking-[-0.50px] leading-10 mb-4">
            What Our Users Say
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xl tracking-[-0.50px] leading-7">
            Real stories from professionals who found their dream jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white rounded-xl shadow-[0px_10px_15px_#0000001a,0px_4px_6px_#0000001a] border-0"
            >
              <CardContent className="p-8 flex flex-col">
                <div className="flex gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.avatar})` }}
                  />
                  <div className="flex flex-col">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-gray-800 text-base tracking-[-0.50px] leading-6">
                      {testimonial.name}
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[-0.50px] leading-5">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-6 mb-4">
                  {testimonial.quote}
                </p>

                <img className="w-full h-6" alt="Rating" src="/div.svg" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
