const LandingPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-4xl">
        Welcome to{" "}
        <span className="text-primary underline">workforge.team</span>
      </h1>
      <div className="flex items-center gap-4">
        <button className="bg-primary text-primary-foreground cursor-pointer rounded-4xl px-6 py-2 font-semibold">
          Join the forge
        </button>
        <button className="bg-secondary border-border text-secondary-foreground cursor-pointer rounded-4xl border px-6 py-2 font-semibold">
          Contact us
        </button>
      </div>
    </main>
  );
};

export default LandingPage;
