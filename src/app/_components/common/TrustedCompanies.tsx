type TrustedCompany = {
  name: string;
  logoFile: string; // file name inside /public/images/img (without leading path)
};

const trustedCompanies: TrustedCompany[] = [
  { name: "eSewa", logoFile: "esewa.png" },
  { name: "Khalti", logoFile: "khalti.png" },
  { name: "Fonepay", logoFile: "fonepay.png" },
  { name: "Foodmandu", logoFile: "foodmandu.png" },
  { name: "SastoDeal", logoFile: "sastodeal.png" },
  { name: "Pathao", logoFile: "pathao.png" },
  { name: "InDrive", logoFile: "indrive.jpg" },
  { name: "Lattice", logoFile: "lattice.webp" },
  { name: "Personio", logoFile: "personio.webp" },
  { name: "Deel", logoFile: "deel.jpg" },
  { name: "Factorial", logoFile: "factorial.png" },
  { name: "HiBob", logoFile: "hi-bob.png" },
];

function Logo({ company }: { company: TrustedCompany }) {
  return (
    <div className="flex h-9 w-[110px] items-center justify-center">
      <img
        src={`/images/img/trustedCompanies/${company.logoFile}`}
        alt={company.name}
        className="h-auto max-h-[28px] w-full max-w-[200px] object-scale-down opacity-70 mix-blend-multiply transition-all duration-300 select-none hover:opacity-90"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

const TrustedCompanies = () => {
  return (
    <section aria-label="Trusted by companies" className="space-y-10 pt-2">
      <p className="text-center text-xs font-medium tracking-[0.11em] text-slate-900 uppercase">
        Trusted by companies from Nepal-first startups to global HR teams
      </p>

      <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-4">
        {trustedCompanies.map((c) => (
          <Logo key={c.name} company={c} />
        ))}
      </div>
    </section>
  );
};

export default TrustedCompanies;
