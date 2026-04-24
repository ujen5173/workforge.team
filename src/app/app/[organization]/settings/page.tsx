"use client";

import {
  Briefcase01Icon,
  Camera02Icon,
  LaptopIcon,
  LockKeyIcon,
  Notification01Icon,
  Settings01Icon,
  Settings02Icon,
  SmartPhone01Icon,
  UserCircleIcon,
} from "hugeicons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "~/components/ui/combobox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import currencies from "~/lib/data/currencies.json";
import timezones from "~/lib/data/timezones.json";
import { cn } from "~/lib/utils";

type TabId =
  | "profile"
  | "professional"
  | "security"
  | "notifications"
  | "preferences";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "My Profile", icon: UserCircleIcon },
  { id: "professional", label: "Professional Info", icon: Briefcase01Icon },
  { id: "security", label: "Security & Passwords", icon: LockKeyIcon },
  { id: "notifications", label: "Notifications", icon: Notification01Icon },
  { id: "preferences", label: "Preferences", icon: Settings02Icon },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [timezone, setTimezone] = useState("est");
  const [currency, setCurrency] = useState("usd");

  return (
    <main className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="border-border flex items-center justify-between gap-4 border-b-2 pb-4">
          <div className="flex items-center gap-4">
            <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
              <Settings01Icon className="text-primary size-6" />
            </div>
            <div>
              <h5 className="text-lg font-bold text-slate-800">Settings</h5>
              <p className="text-muted-foreground text-sm">
                Manage your account structure, security, and personal
                preferences.
              </p>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="w-full shrink-0 md:w-64">
            <nav className="flex flex-row gap-1 overflow-x-auto pb-2 md:flex-col md:pb-0">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                      isActive
                        ? "bg-primary/5 text-primary border-primary/20 border"
                        : "border border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-primary" : "text-slate-500"}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="flex-1 space-y-6">
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-300">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Profile Picture
                    </CardTitle>
                    <CardDescription>
                      This image will be displayed publicly on your WorkForge
                      profile.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="size-20 rounded-full shadow-sm ring-1 ring-neutral-200">
                        <AvatarImage
                          src="https://yt3.ggpht.com/I1ckvWK4apdppBpymT0AKYkj4qOTg7Bn_cgbddnU0JJi1_Sn9hoEI6yuv-MkaaQQeWrhs5JgJRw=s88-c-k-c0x00ffffff-no-rj"
                          alt="Aiden Cooper"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary rounded-full text-xl font-bold">
                          AC
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" className="gap-2">
                            <Camera02Icon size={14} /> Upload New
                          </Button>
                          <Button size="sm" variant="outline">
                            Remove
                          </Button>
                        </div>
                        <p className="text-muted-foreground text-[11px]">
                          Recommended format: JPG, PNG. Max size: 5MB.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Your basic personal data. This affects how others identify
                      you.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-4 py-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>First Name</Label>
                        <Input defaultValue="Aiden" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Last Name</Label>
                        <Input defaultValue="Cooper" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          defaultValue="aiden.cooper@workforge.team"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Phone Number</Label>
                        <Input type="tel" defaultValue="+1 (555) 012-3456" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Bio</Label>
                      <textarea
                        className="border-input bg-background focus-visible:ring-primary/20 min-h-[100px] w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                        defaultValue="Senior software engineer with 8 years of experience building scalable systems. Love teaching and mentoring junior devs."
                      />
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="justify-end py-4">
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Social Profiles
                    </CardTitle>
                    <CardDescription>
                      Share your professional social links with your team.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-4 py-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>LinkedIn</Label>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          defaultValue="https://linkedin.com/in/aidencooper"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>GitHub</Label>
                        <Input
                          placeholder="https://github.com/username"
                          defaultValue="https://github.com/aiden-acme"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Personal Website</Label>
                      <Input placeholder="https://yourwebsite.com" />
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="justify-end py-4">
                    <Button>Save Socials</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeTab === "professional" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-300">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold text-slate-800">
                          Employment Details
                        </CardTitle>
                        <CardDescription>
                          Some details can only be changed by your HR
                          coordinator.
                        </CardDescription>
                      </div>
                      <Badge className="border-amber-200 bg-amber-50 text-amber-700">
                        Read-Only
                      </Badge>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-4 py-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="cursor-not-allowed space-y-1.5 opacity-70">
                        <Label className="cursor-not-allowed">Job Title</Label>
                        <Input
                          defaultValue="Senior Software Engineer"
                          readOnly
                          className="pointer-events-none bg-slate-50 font-semibold"
                        />
                      </div>
                      <div className="cursor-not-allowed space-y-1.5 opacity-70">
                        <Label className="cursor-not-allowed">Department</Label>
                        <Input
                          defaultValue="Engineering"
                          readOnly
                          className="pointer-events-none bg-slate-50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="cursor-not-allowed space-y-1.5 opacity-70">
                        <Label className="cursor-not-allowed">
                          Employment Type
                        </Label>
                        <Input
                          defaultValue="Full-time"
                          readOnly
                          className="pointer-events-none bg-slate-50"
                        />
                      </div>
                      <div className="cursor-not-allowed space-y-1.5 opacity-70">
                        <Label className="cursor-not-allowed">Start Date</Label>
                        <Input
                          defaultValue="March 1, 2022"
                          readOnly
                          className="pointer-events-none bg-slate-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold text-slate-800">
                          Work Setup
                        </CardTitle>
                        <CardDescription>
                          Your daily working logistics and location.
                        </CardDescription>
                      </div>
                      <Badge className="border-amber-200 bg-amber-50 text-amber-700">
                        Read-Only
                      </Badge>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-4 py-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="cursor-not-allowed space-y-1.5 opacity-70">
                        <Label className="cursor-not-allowed">
                          Primary Location
                        </Label>
                        <Input
                          defaultValue="Fully Remote"
                          readOnly
                          className="pointer-events-none bg-slate-50"
                        />
                      </div>
                      <div className="cursor-not-allowed space-y-1.5 opacity-70">
                        <Label className="cursor-not-allowed">
                          Working Hours
                        </Label>
                        <Input
                          defaultValue="09:00 AM - 05:00 PM"
                          readOnly
                          className="pointer-events-none bg-slate-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-300">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Change Password
                    </CardTitle>
                    <CardDescription>
                      Update the password used to log in to your account.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-4 py-6">
                    <div className="max-w-md space-y-1.5">
                      <Label>Current Password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>New Password</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Confirm Password</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="justify-end py-4">
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Two-Factor Authentication (2FA)
                    </CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="border-border flex items-center justify-between gap-4 rounded-lg border bg-slate-50 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Authenticator App
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                          Use an app like Google Authenticator or 1Password to
                          generate a one-time code.
                        </p>
                      </div>
                      <Button variant="outline">Set Up</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Active Sessions
                    </CardTitle>
                    <CardDescription>
                      Devices that are currently logged in to your account.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-4 py-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                          <LaptopIcon className="size-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            MacBook Pro (Mac OS)
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Chrome · New York, USA
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant="outline"
                          className="border-emerald-200 bg-emerald-50 text-[10px] text-emerald-600"
                        >
                          Active Now
                        </Badge>
                      </div>
                    </div>
                    <Separator className="bg-neutral-100" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                          <SmartPhone01Icon className="size-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            iPhone 14 Pro (iOS)
                          </p>
                          <p className="text-muted-foreground text-xs">
                            WorkForge Native App · New York, USA
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-[11px]">
                          Yesterday
                        </span>
                        <Button
                          variant="ghost"
                          className="h-8 px-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-300">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Control which notifications you receive across different
                      channels.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <Label className="text-base">
                            Mentions & Replies
                          </Label>
                          <p className="text-muted-foreground text-[13px]">
                            When someone mentions you in a project or replies to
                            your comment.
                          </p>
                        </div>
                        <Switch id="mentions" defaultChecked />
                      </div>
                      <Separator className="bg-neutral-100" />

                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <Label className="text-base">Leave Activity</Label>
                          <p className="text-muted-foreground text-[13px]">
                            Updates regarding leave requests or team approvals.
                          </p>
                        </div>
                        <Switch id="leave" defaultChecked />
                      </div>
                      <Separator className="bg-neutral-100" />

                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <Label className="text-base">
                            Performance Check-ins
                          </Label>
                          <p className="text-muted-foreground text-[13px]">
                            Reminders to update goals or view new performance
                            statistics.
                          </p>
                        </div>
                        <Switch id="perf" defaultChecked />
                      </div>
                      <Separator className="bg-neutral-100" />

                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <Label className="text-base">Weekly Digest</Label>
                          <p className="text-muted-foreground text-[13px]">
                            An email summary rounding up completed tasks and
                            team wins.
                          </p>
                        </div>
                        <Switch id="digest" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-300">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Regional Settings
                    </CardTitle>
                    <CardDescription>
                      Customize the platform to match your local formatting.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-4 py-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col space-y-1.5">
                        <Label>Timezone</Label>
                        <Combobox items={timezones}>
                          <ComboboxInput
                            className={"h-10"}
                            placeholder="Select a timezone"
                          />
                          <ComboboxContent>
                            <ComboboxEmpty>No timezone found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem
                                  key={item.value}
                                  value={item.value}
                                >
                                  {item.label}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label>Currency</Label>
                        <Combobox items={currencies}>
                          <ComboboxInput
                            className={"h-10"}
                            placeholder="Select a currency"
                          />
                          <ComboboxContent>
                            <ComboboxEmpty>No currency found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem
                                  key={item.value}
                                  value={item.value}
                                >
                                  {item.label}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>Date Format</Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="justify-end py-4">
                    <Button>Save Settings</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
