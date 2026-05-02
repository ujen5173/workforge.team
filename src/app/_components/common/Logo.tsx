import { spicySales } from "~/app/config/font";
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
    <div className="flex items-center gap-2">
      <h3
        className={cn(spicySales.className, getSize[size], color, "font-thin")}
      >
        {siteConfig.name}
        {withDot && "."}
      </h3>
    </div>
  );
};

export default Logo;
