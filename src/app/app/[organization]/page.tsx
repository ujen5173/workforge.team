import { Notification01Icon, Timer02Icon } from "hugeicons-react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

import DashboardCalendar from "~/app/_components/common/dashboard/current-calendar";
import CurrentProject from "~/app/_components/common/dashboard/current-project";
import NextHoliday from "~/app/_components/common/dashboard/next-holiday";
import Notes from "~/app/_components/common/dashboard/notes";
import StatusTracker from "~/app/_components/common/dashboard/status-tracker";
import Timer from "~/app/_components/common/dashboard/timer";
import GlobalSearch from "~/app/_components/common/global-search";
import { Button } from "~/components/ui/button";

const App = () => {
  const getGreetings = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morningggg";
    }

    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "Good Evening";
    }
  };

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/img/avatar.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-foreground mb-0 text-sm font-semibold">
              {getGreetings()}, <span className="text-primary">Ujen Basi</span>
            </p>
            <span className="text-xs text-slate-700">CEO and Co-founder</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <GlobalSearch />
            <Button
              variant={"ghost"}
              size="icon-sm"
              icon={Notification01Icon}
            />
          </div>
          <div className="bg-border mx-1 h-6 w-px"></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Button size="sm" variant={"secondary"} icon={PlusIcon}>
                Create Invoice
              </Button>
              <Button size="sm" icon={Timer02Icon}>
                Start timer
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4 py-4">
        <div className="grid grid-cols-3 items-start gap-4">
          <Timer />
          <CurrentProject />
          <Notes />
        </div>

        <div className="grid grid-cols-3 items-start gap-4">
          <StatusTracker />
          <DashboardCalendar />
          <NextHoliday />
        </div>
      </main>
    </>
  );
};

export default App;
