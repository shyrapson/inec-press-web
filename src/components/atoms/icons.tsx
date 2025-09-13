import { Icon as IconifyIcon, IconProps } from "@iconify/react";
import React from "react";

interface CustomIconProps extends Omit<IconProps, "icon"> {
  icon: string;
  className?: string;
}

const Icon: React.FC<CustomIconProps> = ({ icon, className, ...props }) => {
  const safeIcon =
    typeof icon === "string" && icon.trim() !== "" ? icon : "mdi:alert";

  return <IconifyIcon icon={safeIcon} className={className} {...props} />;
};

export default Icon;
