"use client";

import { CalendarRemove01Icon } from "hugeicons-react";
import {
  CalendarIcon,
  FilterIcon,
  InfoIcon,
  Link2Icon,
  PlusCircleIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const balanceData = [
  { type: "Annual leave", used: 8, total: 18 },
  { type: "Sick leave", used: 2, total: 12 },
  { type: "Personal leave", used: 1, total: 6 },
  { type: "Unpaid leave", used: 0, total: 999 },
];

const leaveRequests = [
  {
    id: "LR-2038",
    type: "Annual leave",
    from: "2026-04-28",
    to: "2026-05-01",
    days: 4,
    approver: "HR + Manager",
    status: "Pending",
  },
  {
    id: "LR-2029",
    type: "Sick leave",
    from: "2026-03-17",
    to: "2026-03-18",
    days: 2,
    approver: "Manager",
    status: "Approved",
  },
  {
    id: "LR-2014",
    type: "Personal leave",
    from: "2026-02-03",
    to: "2026-02-03",
    days: 1,
    approver: "Manager",
    status: "Approved",
  },
  {
    id: "LR-1997",
    type: "Annual leave",
    from: "2026-01-09",
    to: "2026-01-10",
    days: 2,
    approver: "HR + Manager",
    status: "Rejected",
  },
];

export default function LeaveManagementPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "policies">(
    "requests",
  );
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const filteredRequests = useMemo(() => {
    if (filter === "all") return leaveRequests;
    return leaveRequests.filter(
      (request) => request.status.toLowerCase() === filter,
    );
  }, [filter]);

  const calculatedDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff = endDate.getTime() - startDate.getTime();
    if (diff < 0) return 0;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  }, [startDate, endDate]);

  const formatDate = (date: Date | undefined) =>
    date
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "Select date";

  return (
    <main className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <header className="border-border flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
              <CalendarRemove01Icon className="text-primary size-6" />
            </div>
            <div className="">
              <h5 className="text-slate-700">Leave Management</h5>
              <p className="text-sm">
                Apply, track, approve, and plan leave without back-and-forth.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" icon={PlusCircleIcon}>
                  New Leave Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Create leave request</DialogTitle>
                  <DialogDescription>
                    Submit details once. The system routes it to your manager
                    and HR.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Leave type</label>
                    <Select defaultValue="annual">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="annual">Annual leave</SelectItem>
                        <SelectItem value="sick">Sick leave</SelectItem>
                        <SelectItem value="personal">Personal leave</SelectItem>
                        <SelectItem value="unpaid">Unpaid leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Total days</label>
                    <Input
                      value={calculatedDays > 0 ? `${calculatedDays}` : ""}
                      readOnly
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Start date</label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start font-normal"
                          icon={CalendarIcon}
                        >
                          {formatDate(startDate)}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-fit p-3">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                        />
                        <DialogFooter className="pt-2">
                          <DialogClose asChild>
                            <Button size="sm">Done</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">End date</label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start font-normal"
                          icon={CalendarIcon}
                        >
                          {formatDate(endDate)}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-fit p-3">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                        />
                        <DialogFooter className="pt-2">
                          <DialogClose asChild>
                            <Button size="sm">Done</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium">Reason</label>
                    <textarea
                      className="border-input bg-background min-h-24 w-full rounded-sm border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                      placeholder="Share context for your approver..."
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium">
                      Attachment (optional)
                    </label>
                    <Input type="file" />
                    <p className="text-muted-foreground text-xs">
                      Upload supporting document such as medical note or event
                      proof.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Save as draft</Button>
                  <Button>Submit request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Available this year</CardDescription>
              <CardTitle className="text-xl">13 Days</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                18 allocated • 5 already used
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Pending approvals</CardDescription>
              <CardTitle className="text-xl">1 Request</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                Expected decision within 24 hours
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Carry-forward at risk</CardDescription>
              <CardTitle className="text-xl">3 Days</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                Use before cycle end to avoid automatic lapse
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Leave conflict risk</CardDescription>
              <CardTitle className="text-xl">Low</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                No overlap with your direct backup this week
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader className="mb-4">
              <CardTitle className="text-base">
                Leave balance breakdown
              </CardTitle>
              <CardDescription>
                Usage and remaining quota by leave type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {balanceData.map((item) => {
                const percentage =
                  item.total === 999 ? 0 : (item.used / item.total) * 100;
                return (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-muted-foreground">
                        {item.total === 999
                          ? `${item.used} used`
                          : `${item.used}/${item.total} used`}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="mb-4">
              <CardTitle className="text-base">
                Conflict and planning insights
              </CardTitle>
              <CardDescription>
                Actionable checks before submitting leave
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2.5">
              <div className="border-border flex items-start gap-2 rounded-lg border p-3">
                <TriangleAlertIcon className="text-warning mt-0.5 size-4" />
                <div>
                  <p className="text-sm font-medium">
                    No critical overlap detected
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Your selected leave dates do not clash with your team
                    backup.
                  </p>
                </div>
              </div>
              <div className="border-border flex items-start gap-2 rounded-lg border p-3">
                <InfoIcon className="text-primary mt-0.5 size-4" />
                <div>
                  <p className="text-sm font-medium">Best submission window</p>
                  <p className="text-muted-foreground text-xs">
                    Submit annual leave at least 3 working days in advance.
                  </p>
                </div>
              </div>
              <div className="border-border flex items-start gap-2 rounded-lg border p-3">
                <Link2Icon className="text-primary mt-0.5 size-4" />
                <div>
                  <p className="text-sm font-medium">
                    Backup handover required
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Add task handover links in your reason notes for faster
                    approval.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader className="border-border border-b">
              <div className="border-border flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-base">Leave workspace</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" icon={PlusCircleIcon}>
                      New Leave Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Create leave request</DialogTitle>
                      <DialogDescription>
                        Submit details once. The system routes it to your
                        manager and HR.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">
                          Leave type
                        </label>
                        <Select defaultValue="annual">
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="annual">Annual leave</SelectItem>
                            <SelectItem value="sick">Sick leave</SelectItem>
                            <SelectItem value="personal">
                              Personal leave
                            </SelectItem>
                            <SelectItem value="unpaid">Unpaid leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">
                          Total days
                        </label>
                        <Input
                          value={calculatedDays > 0 ? `${calculatedDays}` : ""}
                          readOnly
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">
                          Start date
                        </label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-start font-normal"
                              icon={CalendarIcon}
                            >
                              {formatDate(startDate)}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-fit p-3">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                            />
                            <DialogFooter className="pt-2">
                              <DialogClose asChild>
                                <Button size="sm">Done</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">End date</label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-start font-normal"
                              icon={CalendarIcon}
                            >
                              {formatDate(endDate)}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-fit p-3">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                            />
                            <DialogFooter className="pt-2">
                              <DialogClose asChild>
                                <Button size="sm">Done</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-medium">Reason</label>
                        <textarea
                          className="border-input bg-background min-h-24 w-full rounded-sm border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                          placeholder="Share context for your approver..."
                        />
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-medium">
                          Attachment (optional)
                        </label>
                        <Input type="file" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Save as draft</Button>
                      <Button>Submit request</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="border-border mt-4 flex space-x-5 overflow-x-auto border-b pb-px">
                <button
                  onClick={() => setActiveTab("requests")}
                  className={`border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === "requests"
                      ? "border-primary text-primary"
                      : "text-muted-foreground border-transparent"
                  }`}
                >
                  My Requests
                </button>
                <button
                  onClick={() => setActiveTab("policies")}
                  className={`border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === "policies"
                      ? "border-primary text-primary"
                      : "text-muted-foreground border-transparent"
                  }`}
                >
                  Policies & Rules
                </button>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              {activeTab === "requests" && (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <FilterIcon className="text-muted-foreground size-4" />
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Leave Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Approver</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {request.id}
                          </TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>
                            {request.from} → {request.to}
                          </TableCell>
                          <TableCell>{request.days}</TableCell>
                          <TableCell>{request.approver}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.status === "Approved"
                                  ? "default"
                                  : request.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}

              {activeTab === "policies" && (
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border-border rounded-lg border p-3">
                    <p className="text-sm font-medium">Notice period</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Apply annual leave at least 3 working days before start
                      date unless emergency.
                    </p>
                  </div>
                  <div className="border-border rounded-lg border p-3">
                    <p className="text-sm font-medium">
                      Sick leave documentation
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      For 2+ consecutive days, upload basic medical document to
                      HR.
                    </p>
                  </div>
                  <div className="border-border rounded-lg border p-3">
                    <p className="text-sm font-medium">Conflict prevention</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      The portal flags overlapping critical-role absences before
                      submission.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
