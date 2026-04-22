import { siteConfig } from "~/lib/site";
import { cn } from "~/lib/utils";

const getSize = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
} as const;

type LogoProps = {
  withDot?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
};

const Logo = ({ withDot = true, size = "md", color }: LogoProps) => {
  return (
    <h3 className={cn(getSize[size], color, "font-semibold")}>
      {siteConfig.name}
      {withDot && "."}
    </h3>
  );
};

export default Logo;
