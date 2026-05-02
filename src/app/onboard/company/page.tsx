"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CompanyProfileIndustry from "~/app/_components/onboaring/company-industry";
import CompanyProfile from "~/app/_components/onboaring/company-profile";
import OnboardFirstUser from "~/app/_components/onboaring/onboard-first-user";
import StepIndicator from "~/app/_components/onboaring/step-indicator";
import TeamInvitation from "~/app/_components/onboaring/team-invitation";
import Verification from "~/app/_components/onboaring/verification";

import { Button } from "~/components/ui/button";
import { useOnboard } from "~/stores/hooks";

const CompanyOnboardingPage = () => {
  const { step, prevStep } = useOnboard();

  const router = useRouter();

  const stepHeader = [
    {
      title: "Set up your company profile",
      subtitle: "This is how your workspace will appear to your team.",
    },
    {
      title: "Tell us about your company",
      subtitle: "A few details to personalise your WorkForge workspace.",
    },
    {
      title: "Sign up your account",
      subtitle: "This is the account from which you will login your workspace.",
    },
    {
      title: "Create team account",
      subtitle:
        "Start building your team. You can always add more people later.",
    },
    {
      title: "Account Verification",
      subtitle:
        "A verification OPT email has been sent to your email. Please verify to proceed.",
    },
  ][step - 1]!;

  return (
    <main className="flex flex-1 justify-center items-center py-10 w-full">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-4">
          <Button
            type="button"
            onClick={() => (step === 1 ? router.back() : prevStep())}
            icon={ChevronLeft}
            variant="link"
            className="px-0"
          >
            {step === 1 ? "Back" : "Previous step"}
          </Button>
        </div>

        <StepIndicator current={step} />
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-6">
            <h1 className="mb-1.5 font-semibold text-slate-800 text-2xl">
              {stepHeader.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {stepHeader.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {step === 1 && <CompanyProfile />}

            {step === 2 && <CompanyProfileIndustry />}

            {step === 3 && <OnboardFirstUser />}

            {step === 4 && <TeamInvitation />}

            {step === 5 && <Verification />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyOnboardingPage;
