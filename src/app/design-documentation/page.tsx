import React from "react";

const ColorSwatch = ({
  name,
  variable,
}: {
  name: string;
  variable: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 w-full rounded-lg border"
        style={{ background: `var(${variable})` }}
      />
      <div className="text-sm font-medium">{name}</div>
      <div className="text-muted-foreground text-xs">{variable}</div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
};

const DesignDocumentation = () => {
  return (
    <div className="bg-background text-foreground min-h-screen space-y-16 p-10">
      <h1 className="text-4xl font-bold">Design System Preview</h1>

      <Section title="Surfaces">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <ColorSwatch name="Background" variable="--background" />
          <ColorSwatch name="Foreground" variable="--foreground" />
          <ColorSwatch name="Card" variable="--card" />
          <ColorSwatch name="Popover" variable="--popover" />
          <ColorSwatch name="Border" variable="--border" />
          <ColorSwatch name="Input" variable="--input" />
          <ColorSwatch name="Ring" variable="--ring" />
        </div>
      </Section>

      <Section title="Brand Colors">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <ColorSwatch name="Primary" variable="--primary" />
          <ColorSwatch name="Blue" variable="--blue" />
          <ColorSwatch name="Indigo" variable="--indigo" />
          <ColorSwatch name="Accent" variable="--accent" />
        </div>
      </Section>

      <Section title="Status Colors">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <ColorSwatch name="Success" variable="--success" />
          <ColorSwatch name="Warning" variable="--warning" />
          <ColorSwatch name="Danger" variable="--danger" />
          <ColorSwatch name="Destructive" variable="--destructive" />
        </div>
      </Section>

      <Section title="Chart Palette">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <ColorSwatch name="Chart 1" variable="--chart-1" />
          <ColorSwatch name="Chart 2" variable="--chart-2" />
          <ColorSwatch name="Chart 3" variable="--chart-3" />
          <ColorSwatch name="Chart 4" variable="--chart-4" />
          <ColorSwatch name="Chart 5" variable="--chart-5" />
        </div>
      </Section>

      <Section title="Sidebar Tokens">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <ColorSwatch name="Sidebar" variable="--sidebar" />
          <ColorSwatch name="Sidebar Primary" variable="--sidebar-primary" />
          <ColorSwatch name="Sidebar Accent" variable="--sidebar-accent" />
          <ColorSwatch name="Sidebar Border" variable="--sidebar-border" />
        </div>
      </Section>

      <Section title="Border Radius Scale">
        <div className="flex flex-wrap gap-6">
          {[
            ["sm", "--radius-sm"],
            ["md", "--radius-md"],
            ["lg", "--radius-lg"],
            ["xl", "--radius-xl"],
          ].map(([label, variable]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="bg-primary h-24 w-24"
                style={{ borderRadius: `var(${variable})` }}
              />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-xl font-semibold">Sans</h3>
            <p className="text-lg">
              The quick brown fox jumps over the lazy dog 1234567890
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold">Mono</h3>
            <p className="mono text-lg">
              const total = 2499.00; // tabular numbers enabled
            </p>
          </div>
        </div>
      </Section>

      <Section title="Animations">
        <div className="flex flex-wrap gap-10">
          <div className="bg-primary animate-shine h-24 w-24 rounded-lg bg-[length:200%_100%]" />
          <div className="bg-primary animate-fade-in h-24 w-24 rounded-lg" />
          <div className="bg-primary animate-fade-up h-24 w-24 rounded-lg" />
          <div className="bg-primary animate-scale-in h-24 w-24 rounded-lg" />
          <div className="bg-primary animate-slide-in-right h-24 w-24 rounded-lg" />
        </div>
      </Section>
    </div>
  );
};

export default DesignDocumentation;
