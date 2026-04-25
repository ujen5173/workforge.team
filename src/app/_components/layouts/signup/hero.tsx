import { ArrowRight, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { siteConfig } from "~/lib/site";

const SignupHeroSection = () => {
  return (
    <>
      <div className="border-border absolute bottom-6 left-1/2 mx-auto flex max-w-2xl -translate-x-1/2 items-center gap-4 rounded-md border bg-slate-50 p-4 shadow-sm">
        <div className="flex size-10 items-center justify-center rounded-full bg-yellow-300">
          <MailIcon size={16} className="stroke-yellow-700 stroke-2" />
        </div>

        <div className="flex-1 space-y-1">
          <h6 className="text-md font-medium text-slate-700">
            Are you an employee? Check your inbox!
          </h6>
          <p className="text-sm">
            If your employer uses{" "}
            <span className="text-primary underline">{siteConfig.name}</span>,
            they will send you an email invitation to sign up.
          </p>
        </div>
      </div>

      <div className="mb-10 space-y-3 text-center">
        <h1 className="text-4xl font-semibold text-slate-800">
          How will you use {siteConfig.name}?
        </h1>
        <p className="text-foreground">Select one of the options below</p>
      </div>

      <div className="mx-auto flex max-w-2xl gap-6">
        <div className="flex flex-col rounded-xl bg-gradient-to-br from-[#f5f2fd] to-[#ece7f9] p-8">
          <Image
            alt="Company Illustration"
            width={960}
            height={960}
            className="mb-4 w-20 object-cover"
            src={"/images/illustrations/company.png"}
          />
          <h4 className="mb-2 text-xl font-semibold text-[#3b2d6e]">
            To <span className="text-primary underline">run</span> my business
          </h4>
          <p className="flex-1 text-sm font-medium text-[#7c6aaa]">
            Manage your team, streamline workflows, and oversee operations — all
            from one powerful platform built for modern businesses.
          </p>
          <Button
            variant={"outline"}
            className="mt-4 h-10 w-full cursor-pointer rounded-sm bg-transparent text-slate-700"
            icon={ArrowRight}
            iconPlacement="right"
          >
            Get started
          </Button>
        </div>
        <div className="flex flex-col rounded-xl bg-gradient-to-br from-[#f0f8fe] to-[#daedfb] p-8">
          <Image
            alt="Employee Illustration"
            width={960}
            height={960}
            className="mb-4 w-20 object-cover"
            src={"/images/illustrations/employee.png"}
          />
          <h4 className="mb-2 text-xl font-semibold text-[#1d3d5c]">
            To <span className="text-primary underline">work</span> in a
            business
          </h4>
          <p className="flex-1 text-sm font-medium text-[#4a7a9b]">
            Access your tasks, collaborate with teammates, and stay on top of
            your work — wherever your day takes you.
          </p>
          <Button
            variant={"outline"}
            icon={ArrowRight}
            iconPlacement="right"
            className="mt-4 h-10 w-full cursor-pointer rounded-sm bg-transparent text-slate-700"
          >
            Get started
          </Button>
        </div>
      </div>
      <p className="text-center">
        Please read our the{" "}
        <Link href="/terms-and-condition" className="text-primary/80 underline">
          terms and conditions
        </Link>{" "}
        before signing up.
      </p>
    </>
  );
};

export default SignupHeroSection;
