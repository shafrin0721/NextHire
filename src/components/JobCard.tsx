import {
    BriefcaseIcon,
    ClockIcon,
    DollarSignIcon,
    MapPinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface Job {
    id: string;
    title: string;
    company: string;
    level: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
}

interface JobCardProps {
    job: Job;
}

export const JobCard = ({ job }: JobCardProps): JSX.Element => {
    return (
        <Card
            key={job.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-[0px_10px_24px_rgba(15,23,42,0.08)] transition-all hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)]"
        >
            <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-lg tracking-[-0.50px] leading-6">
                            {job.title}
                        </h3>
                        <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[-0.50px] leading-5">
                            {job.company}
                        </p>
                    </div>
                    <span className="[font-family:'Inter',Helvetica] text-xs text-blue-600 bg-blue-50 rounded-full px-3 py-1 font-medium">
                        {job.level}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-gray-500" />
                        <span className="[font-family:'Inter',Helvetica]">
                            {job.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSignIcon className="w-4 h-4 text-gray-500" />
                        <span className="[font-family:'Inter',Helvetica]">
                            {job.salary}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BriefcaseIcon className="w-4 h-4 text-gray-500" />
                        <span className="[font-family:'Inter',Helvetica]">
                            {job.type}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ClockIcon className="w-4 h-4" />
                        <span className="[font-family:'Inter',Helvetica]">
                            Posted {job.posted}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            asChild
                            variant="outline"
                            className="h-9 px-4 rounded-lg text-sm [font-family:'Inter',Helvetica]"
                        >
                            <Link to={`/job-details/${job.id}`}>View Details</Link>
                        </Button>
                        <Button
                            asChild
                            className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm [font-family:'Inter',Helvetica]"
                        >
                            <Link to={`/apply/${job.id}`}>Apply Now</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
