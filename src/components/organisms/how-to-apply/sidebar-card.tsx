import Icon from "@/components/atoms/icons";
import { ReactNode } from "react";

interface SidebarCardProps {
  icon: string;
  iconBgColor: string;
  title: string;
  description: string;
  highlightText?: string;
}

const SidebarCard = ({
  icon,
  iconBgColor,
  title,
  description,
  highlightText,
}: SidebarCardProps) => {
  const renderDescription = () => {
    if (!highlightText) {
      return <span className="text-sm">{description}</span>;
    }

    const parts = description.split(highlightText);
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="text-sm font-bold text-[#448220]">
            {highlightText}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div className="w-full border rounded-lg border-election-border rounded-election-card bg-white p-6">
      <div className="flex flex-col gap-6">
        <Icon icon={icon} className={`${iconBgColor}`} />
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold text-[#181817] leading-10">
            {title}
          </h3>
          <div className="text-sm leading-6">{renderDescription()}</div>
        </div>
      </div>
    </div>
  );
};

export const HowToApplyCard = () => (
  <SidebarCard
    icon="icon-park-solid:guide-board"
    iconBgColor="text-red-500"
    title="How To Apply"
    description="CLICK HERE to find out how you can apply."
    highlightText="CLICK HERE"
  />
);

export const NewApplicantCard = () => (
  <SidebarCard
    icon="material-symbols:fiber-new"
    iconBgColor="text-green-500"
    title="New Applicant"
    description="To register for the 2024 Edo and Ondo State Governorship Election engagement, CLICK HERE to get started."
    highlightText="CLICK HERE"
  />
);

export const HaveQuestionCard = () => (
  <SidebarCard
    icon="ix:question-filled"
    iconBgColor="text-yellow-500"
    title="Have a Question?"
    description="If you are facing any challenge or have a question then click here to contact us."
  />
);

export default SidebarCard;
