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
      return "Good Morning";
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
      <header className="flex justify-between items-center mb-4 p-4 pb-0">
        <div className="flex items-center gap-2">
          <Image
            src="/images/img/avatar.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col gap-0.5">
            <p className="mb-0 font-semibold text-foreground text-sm">
              {getGreetings()}, <span className="text-primary">Ujen Basi</span>
            </p>
            <span className="text-slate-700 text-xs">CEO and Co-founder</span>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4">
          <div className="flex items-center gap-2">
            <GlobalSearch />
            <Button
              variant={"ghost"}
              size="icon-sm"
              icon={Notification01Icon}
            />
          </div>
          <div className="mx-1 bg-border w-px h-6"></div>
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

      <main className="space-y-4 mx-auto p-4 max-w-7xl">
        <div className="items-start gap-4 grid grid-cols-3">
          <Timer />
          <CurrentProject />
          <Notes />
        </div>

        <div className="items-start gap-4 grid grid-cols-3">
          <StatusTracker />
          <DashboardCalendar />
          <NextHoliday />
        </div>
      </main>
    </>
  );
};

export default App;
