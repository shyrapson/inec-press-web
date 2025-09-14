"use client";

import { PAGE_ROUTES } from "@/common/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobPositionProps {
  title: string;
  requirements: string[];
}

const JobPosition = ({ title, requirements }: JobPositionProps) => {
  const router = useRouter();
  const handleApply = () => {
    router.push(PAGE_ROUTES.REGISTER_PAGE);
  };
  return (
    <div className="relative  bg-green-50 p-4 mb-6">
      <div className="absolute h-20 left-0 top-4 bottom-4 w-1 bg-green-600 rounded-r"></div>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-[700] text-sm text-gray-900">{title}</h3>
        <Button
          variant="ghost"
          className="text-green-600 hover:text-[#448220] p-0 h-auto font-[700]"
          onClick={handleApply}
        >
          Click to Apply <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {requirements.map((requirement, index) => (
          <div key={index} className="font-[400] text-sm text-[#607087]">
            {requirement.startsWith("Requirement:") ? (
              <div>
                <span className="text-red-500 font-bold">Requirement:</span>
                <span className="ml-1">
                  {requirement.replace("Requirement:", "").trim()}
                </span>
              </div>
            ) : (
              <div className="ml-4">
                <span className="mr-2">•</span>
                {requirement}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosition;
