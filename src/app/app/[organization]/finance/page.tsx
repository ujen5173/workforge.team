"use client";

import {
  ArrowRight01Icon,
  Briefcase01Icon,
  Clock01Icon,
  CreditCardPosIcon,
  Download01Icon,
  EyeIcon,
  FileExportIcon,
  Invoice01Icon,
  MoneyBag02Icon,
  PlusSignIcon,
  PurseIcon,
  ViewOffSlashIcon,
} from "hugeicons-react";
import { useState } from "react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const mockPayHistory = [
  {
    id: "PAY-004",
    period: "March 2026",
    type: "Hourly",
    hours: 160,
    rate: "$45.00/hr",
    amount: "$7,200.00",
    status: "Paid",
    date: "Apr 1, 2026",
  },
  {
    id: "PAY-003",
    period: "February 2026",
    type: "Hourly",
    hours: 152,
    rate: "$45.00/hr",
    amount: "$6,840.00",
    status: "Paid",
    date: "Mar 1, 2026",
  },
  {
    id: "PAY-002",
    period: "January 2026",
    type: "Hourly",
    hours: 168,
    rate: "$45.00/hr",
    amount: "$7,560.00",
    status: "Paid",
    date: "Feb 1, 2026",
  },
  {
    id: "PAY-001",
    period: "December 2025",
    type: "Hourly",
    hours: 140,
    rate: "$45.00/hr",
    amount: "$6,300.00",
    status: "Paid",
    date: "Jan 1, 2026",
  },
];

export default function FinancePage() {
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl">
        <header className="border-border flex items-center justify-between border-b-2 pb-4">
          <div className="flex items-center gap-4">
            <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
              <CreditCardPosIcon className="text-primary size-6" />
            </div>
            <div className="">
              <h5 className="text-slate-700">Finance & Payroll</h5>
              <p className="text-sm text-muted-foreground">
                View your pay statements, banking details, and compensation
                history.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant={"outline"} icon={FileExportIcon}>
              Export History
            </Button>
            <Button size="sm" variant={"default"} icon={PlusSignIcon}>
              Issue Paycheck
            </Button>
          </div>
        </header>

        <section className="py-6 pt-8 space-y-8">
          <Card className="space-y-0 gap-0 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
            <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none">
              <MoneyBag02Icon size={200} />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Invoice01Icon className="size-5 text-primary" />
                    Latest Paycheck
                  </CardTitle>
                  <CardDescription className="mt-1">
                    For pay period: March 1 – March 31, 2026
                  </CardDescription>
                </div>
                <Badge
                  variant="default"
                  className="bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-600/20"
                >
                  Calculated
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="py-2">
                  <div className="flex items-end gap-3 mb-8">
                    <h2 className="text-4xl font-black tracking-tight text-slate-800">
                      $7,200.00
                    </h2>
                    <p className="text-sm text-muted-foreground mb-1 pb-1">
                      Net Pay
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2.5 rounded-lg">
                        <Clock01Icon className="size-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                          Pay Basis
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          Hourly — $45.00 / hr
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-2.5 rounded-lg">
                        <Briefcase01Icon className="size-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                          Hours Tracked
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          160 hrs · March 2026
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2.5 rounded-lg">
                        <PurseIcon className="size-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                          Money day
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          March 15th{" "}
                          <span className="text-slate-500">
                            (6 days remaining)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center py-2">
                  <div
                    className="relative overflow-hidden text-white flex-shrink-0"
                    style={{
                      width: "430px",
                      height: "272px",
                      borderRadius: "20px",
                      boxShadow:
                        "0 24px 48px -8px rgba(15,21,69,0.55), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #0f0c29 0%, #1a1a4e 30%, #1a3a6a 60%, #4b2f8a 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.11) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(100,60,220,0.22) 0%, transparent 50%)",
                      }}
                    />
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 430 272"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <circle
                        cx="430"
                        cy="272"
                        r="180"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="430"
                        cy="272"
                        r="135"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="430"
                        cy="272"
                        r="90"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                    </svg>
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                      }}
                    />

                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 mb-0.5">
                            Direct Deposit
                          </p>
                          <p className="text-base font-bold tracking-[0.18em] text-white uppercase">
                            WorkForge
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setShowAccountDetails(!showAccountDetails)
                          }
                          className="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60 hover:text-white"
                        >
                          {showAccountDetails ? (
                            <>
                              <ViewOffSlashIcon size={12} />
                            </>
                          ) : (
                            <>
                              <EyeIcon size={12} />
                            </>
                          )}
                        </button>
                      </div>

                      <div>
                        <svg
                          width="28"
                          height="22"
                          viewBox="0 0 28 22"
                          fill="none"
                          className="mb-2 opacity-50"
                        >
                          <path
                            d="M4 11 C4 6.58 7.58 3 12 3"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M1 11 C1 4.92 5.92 0 12 0"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.5"
                          />
                          <path
                            d="M7 11 C7 8.24 9.24 6 12 6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <circle cx="12" cy="11" r="2.5" fill="white" />
                        </svg>
                        <p
                          className="font-mono font-medium text-white tracking-[0.25em] transition-all duration-300"
                          style={{
                            fontSize: "20px",
                            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                          }}
                        >
                          {showAccountDetails
                            ? "9876  5432  1098  7654"
                            : "••••  ••••  ••••  1098"}
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <div className="flex gap-5">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
                              Card Holder
                            </p>
                            <p className="text-[13px] font-semibold tracking-wider text-white uppercase">
                              Alex Johnson
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
                              Bank
                            </p>
                            <p className="text-[13px] font-semibold tracking-wider text-white uppercase">
                              Chase
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
                              Routing
                            </p>
                            <p className="font-mono text-[13px] tracking-widest text-white">
                              {showAccountDetails ? "122000248" : "•••••••••"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center -space-x-4">
                          <div className="w-10 h-10 rounded-full bg-red-500/90 shadow-md" />
                          <div className="w-10 h-10 rounded-full bg-amber-400/80 mix-blend-screen shadow-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-transparent border-t border-primary/10 pt-4 flex gap-3 mt-2">
              <Button variant="default" size="sm" icon={Download01Icon}>
                Download Payslip
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                Earnings Breakdown
                <ArrowRight01Icon size={16} />
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-slate-800">
                Pay History
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed history of your past payments and statements.
              </p>
            </div>

            <div className="rounded-xl border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[120px]">Payment ID</TableHead>
                    <TableHead>Pay Period</TableHead>
                    <TableHead>Date Paid</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Hours / Rate</TableHead>
                    <TableHead className="text-right">Net Amount</TableHead>
                    <TableHead className="w-[100px] text-center">
                      Status
                    </TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayHistory.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {row.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {row.period}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-slate-50 text-slate-600"
                        >
                          {row.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.hours}h <span className="mx-1">@</span> {row.rate}
                      </TableCell>
                      <TableCell className="text-right font-black text-slate-700">
                        {row.amount}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-700 hover:bg-green-200 border-0"
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-8 w-8 text-muted-foreground"
                        >
                          <Download01Icon size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
