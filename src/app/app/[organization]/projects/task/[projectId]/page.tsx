"use client";

import {
  BubbleChatQuestionIcon,
  Calendar01Icon,
  CodeIcon,
  ContentWritingIcon,
  Download04Icon,
  FileEmpty02Icon,
  Folder01Icon,
  FolderExportIcon,
  Notification01Icon,
  PlusSignIcon,
  Search01Icon,
  Unlink04Icon,
  UserGroupIcon,
} from "hugeicons-react";
import Image from "next/image";
import { useState } from "react";
import { mockProjects } from "~/app/_components/common/projects-tasks/table/mock-data";
import { tasksColumns } from "~/app/_components/common/tasks/table/columns";
import { tasksData } from "~/app/_components/common/tasks/table/mock-data";
import { TASK_STATUS } from "~/app/_components/common/tasks/table/types";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

const Project = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [taskStatus, setTaskStatus] = useState("IN_PROGRESS");
  const firstProject = mockProjects[0];

  const taskStatusOptions = Object.values(TASK_STATUS).filter(
    (value) => typeof value === "string",
  );

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl">
        <header className="border-border flex items-center justify-between border-b-2 pb-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/5 rounded-full">
              {firstProject?.logo ? (
                <div className="border-border size-12 rounded-full border shadow-sm">
                  <Image
                    src={firstProject.logo}
                    width={200}
                    height={200}
                    className="aspect-square rounded-full object-contain p-1"
                    alt={"Project Logo"}
                  />
                </div>
              ) : (
                <div className="border-border flex size-12 items-center justify-center rounded-full border bg-slate-100 p-2.5 text-slate-700">
                  <Folder01Icon />
                </div>
              )}
            </div>
            <div className="">
              <h5 className="font-semibold text-slate-800">Project Detail</h5>
              <p className="mt-0.5 text-sm text-slate-500">
                View, Assign and work with team on the project.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Button
                size="icon-sm"
                variant={"ghost"}
                icon={Search01Icon}
                className="text-slate-500 hover:text-slate-800"
              />
              <Button
                size="icon-sm"
                variant={"ghost"}
                icon={Notification01Icon}
                className="text-slate-500 hover:text-slate-800"
              />
            </div>
            <div className="bg-border mx-1 h-6 w-px"></div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={"ghost"}
                icon={FolderExportIcon}
                className="text-slate-600"
              >
                Export
              </Button>
              <Button
                size="sm"
                variant={"outline"}
                icon={PlusSignIcon}
                className="font-medium"
              >
                Invite People
              </Button>
            </div>
          </div>
        </header>

        <section className="py-4">
          <div className="border-border mb-8 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
                Workforge.team
              </h1>
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  On Progress
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <Calendar01Icon className="size-4" />
                  Due Date
                </span>
                <span className="text-slate-800">5 March 2027</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <UserGroupIcon className="size-4" />
                  Assignees
                </span>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-slate-800">Ashwesha, Ujen, Sujit</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <BubbleChatQuestionIcon className="size-4" />
                  Type
                </span>
                <span className="w-max rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">
                  HR Solutions
                </span>
              </div>
              <div className="col-span-1 mt-2 flex flex-col gap-1.5 md:col-span-2 lg:col-span-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <ContentWritingIcon className="size-4" />
                  Description
                </span>
                <span
                  className="line-clamp-2 max-w-4xl leading-relaxed text-slate-700"
                  title="One platform for hiring, communicating, managing, and growing your team — from day one to day done. It simplifies all HR logic while maintaining enterprise compliance out of the box."
                >
                  One platform for hiring, communicating, managing, and growing
                  your team — from day one to day done. It simplifies all HR
                  logic while maintaining enterprise compliance out of the box.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-6">
              <div className="border-border mb-8 flex space-x-2 overflow-x-auto border-b pb-px sm:space-x-6">
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === "tasks"
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  Project Tasks
                </button>
                <button
                  onClick={() => setActiveTab("discussions")}
                  className={`border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === "discussions"
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  Discussions
                </button>
                <button
                  onClick={() => setActiveTab("links")}
                  className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === "links"
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  Links & Resources{" "}
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                    4
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("attachments")}
                  className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === "attachments"
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  Attachments{" "}
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                    5
                  </span>
                </button>
              </div>

              {activeTab === "tasks" && (
                <>
                  <div className="mb-6 flex w-full items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Tasks
                      </h2>
                      <p className="mt-0.5 text-sm text-slate-500">
                        Manage and track the tasks associated with this project.
                      </p>
                    </div>
                  </div>

                  <DataTable
                    columns={tasksColumns}
                    data={tasksData}
                    actionAfterRowClicked={{
                      status: true,
                      action: "OPEN_SIDEBAR",
                    }}
                    defaultPageSize={10}
                  />

                  <div className="mt-6 flex justify-end">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" icon={BubbleChatQuestionIcon}>
                          Open Task Detail Sheet
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-[50vw]!">
                        <div className="border-border border-b px-4 pt-6 pb-6">
                          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                            Craftboard Project / In Progress
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                            KPI and Employee Statistics Page
                          </h2>
                          <p className="text-sm text-slate-500">
                            Task details with collaboration and quick support
                            actions.
                          </p>
                        </div>

                        <div className="space-y-6 px-6 py-5">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                              <div className="space-y-1">
                                <p className="flex items-center gap-1.5 font-medium text-slate-500">
                                  <BubbleChatQuestionIcon className="size-4" />
                                  Status
                                </p>
                                <p className="font-medium text-slate-800">
                                  {taskStatus}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="flex items-center gap-1.5 font-medium text-slate-500">
                                  <Calendar01Icon className="size-4" />
                                  Due date
                                </p>
                                <p className="font-medium text-slate-800">
                                  5 March 2027
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                              <div className="space-y-1">
                                <p className="font-medium text-slate-500">
                                  Type
                                </p>
                                <p className="w-max rounded-md bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700">
                                  Design
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="font-medium text-slate-500">
                                  Assigned by
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                                    ST
                                  </span>
                                  <p className="font-medium text-slate-800">
                                    Sujit Tamang
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                                <UserGroupIcon className="size-4" />
                                Assignee
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm text-slate-700">
                                  Calum Tyler
                                </span>
                                <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-sm font-medium text-emerald-700">
                                  Dawson Tarman
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  icon={PlusSignIcon}
                                >
                                  Invite
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium text-slate-500">
                                Reviewer
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                                  RT
                                </span>
                                <p className="text-sm font-medium text-slate-800">
                                  Ritika Thapa
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium text-slate-500">
                                Tags
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                                  Dashboard
                                </span>
                                <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                                  Medium
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                                <ContentWritingIcon className="size-4" />
                                Description
                              </p>
                              <div className="border-border rounded-lg border bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                                This page aims to provide real-time insights
                                into employee performance metrics and key
                                business indicators.
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                              <div className="space-y-1">
                                <p className="font-medium text-slate-500">
                                  Created at
                                </p>
                                <p className="font-medium text-slate-800">
                                  18 Feb 2027, 09:45 AM
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="font-medium text-slate-500">
                                  Updated at
                                </p>
                                <p className="font-medium text-slate-800">
                                  22 Feb 2027, 04:10 PM
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
                              <p className="text-sm font-medium text-slate-800">
                                Actions
                              </p>
                              <p className="text-xs text-slate-500">
                                Change task status quickly based on progress.
                              </p>
                              <Select
                                value={taskStatus}
                                onValueChange={(value) => setTaskStatus(value)}
                              >
                                <SelectTrigger className="w-full sm:w-64">
                                  <SelectValue placeholder="Change status" />
                                </SelectTrigger>

                                <SelectContent>
                                  {taskStatusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                      {status.replaceAll("_", " ")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-slate-700">
                                Attachment (2)
                              </p>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-primary"
                                icon={Download04Icon}
                              >
                                Download All
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <div className="border-border flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="rounded-md bg-red-50 p-2 text-red-500">
                                    <FileEmpty02Icon className="size-4" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-slate-800">
                                      Design brief.pdf
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      1.5 MB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="icon-sm"
                                  variant="ghost"
                                  icon={Download04Icon}
                                />
                              </div>

                              <div className="border-border flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="rounded-md bg-amber-50 p-2 text-amber-500">
                                    <FileEmpty02Icon className="size-4" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-slate-800">
                                      Craftboard logo.ai
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      2.5 MB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="icon-sm"
                                  variant="ghost"
                                  icon={Download04Icon}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
                            <p className="text-sm font-medium text-slate-800">
                              Discussion Panel
                            </p>
                            <div className="space-y-3">
                              <div className="rounded-lg bg-slate-50 p-3">
                                <p className="text-sm font-medium text-slate-800">
                                  Calum Tyler
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                  Can we highlight month-on-month growth in a
                                  separate section?
                                </p>
                              </div>
                              <div className="rounded-lg bg-blue-50 p-3">
                                <p className="text-sm font-medium text-slate-800">
                                  Dawson Tarman
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                  Yes, I will include growth deltas and color
                                  indicators in the next version.
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" icon={PlusSignIcon}>
                              Add Comment
                            </Button>
                          </div>

                          <div className="border-border rounded-lg border bg-amber-50 p-4">
                            <p className="text-sm font-medium text-amber-900">
                              Need support from another teammate?
                            </p>
                            <p className="mt-1 text-sm text-amber-800">
                              Notify someone instantly to unblock this task and
                              keep delivery on track.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button icon={Notification01Icon}>
                                Notify for Help
                              </Button>
                              <Button variant="outline" icon={UserGroupIcon}>
                                Request Reviewer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              )}

              {activeTab === "discussions" && (
                <div className="border-border rounded-xl border border-dashed bg-slate-50 p-12 text-center">
                  <BubbleChatQuestionIcon className="mx-auto mb-4 size-12 text-slate-300" />
                  <h3 className="text-lg font-medium text-slate-800">
                    No discussions yet
                  </h3>
                  <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                    Start a discussion with your team to share ideas and ask
                    questions.
                  </p>
                  <Button className="mt-6">New Discussion</Button>
                </div>
              )}

              {activeTab === "links" && (
                <div className="mb-10">
                  <div className="mb-6 flex w-full items-center justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                        <Unlink04Icon className="size-5 text-slate-500" />
                        Project Links & Resources
                      </h2>
                      <p className="mt-0.5 text-sm text-slate-500">
                        External repositories, design files, and documentation.
                      </p>
                    </div>
                    <Button size="sm" variant="outline" icon={PlusSignIcon}>
                      Add Link
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-orange-100 bg-orange-50 p-2.5 text-orange-500">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          Figma Design
                        </span>
                        <span className="mt-0.5 truncate text-xs text-slate-500">
                          figma.com/design/workforge
                        </span>
                      </div>
                    </div>

                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-slate-200 bg-slate-100 p-2.5 text-slate-700">
                        <CodeIcon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          Frontend App
                        </span>
                        <span className="mt-0.5 truncate text-xs text-slate-500">
                          github.com/workforge/web
                        </span>
                      </div>
                    </div>

                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-slate-200 bg-slate-100 p-2.5 text-slate-700">
                        <CodeIcon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          Backend API
                        </span>
                        <span className="mt-0.5 truncate text-xs text-slate-500">
                          github.com/workforge/api
                        </span>
                      </div>
                    </div>

                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-blue-100 bg-blue-50 p-2.5 text-blue-500">
                        <BubbleChatQuestionIcon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          Team Channel
                        </span>
                        <span className="mt-0.5 truncate text-xs text-slate-500">
                          #project-workforge
                        </span>
                      </div>
                    </div>

                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-2.5 text-emerald-500">
                        <ContentWritingIcon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          Instructions
                        </span>
                        <span className="mt-0.5 truncate text-xs text-slate-500">
                          docs.google.com/...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "attachments" && (
                <div className="mb-10">
                  <div className="mb-6 flex w-full items-center justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                        <Unlink04Icon className="size-5 text-slate-500" />
                        Project Attachments
                      </h2>
                      <p className="mt-0.5 text-sm text-slate-500">
                        Files, documents, and assets uploaded to this project.
                      </p>
                    </div>
                    <Button size="sm" variant="outline" icon={Download04Icon}>
                      Download All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-red-100 bg-red-50 p-2.5 text-red-500">
                        <FileEmpty02Icon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          Quality-Testing Task.pdf
                        </span>
                        <span className="mt-0.5 text-xs text-slate-500">
                          21.32 MB
                        </span>
                      </div>
                      <div className="p-1 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-800">
                        <Download04Icon className="size-4" />
                      </div>
                    </div>

                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-2.5 text-emerald-500">
                        <FileEmpty02Icon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          .env
                        </span>
                        <span className="mt-0.5 text-xs text-slate-500">
                          840 Kb
                        </span>
                      </div>
                      <div className="p-1 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-800">
                        <Download04Icon className="size-4" />
                      </div>
                    </div>

                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-blue-100 bg-blue-50 p-2.5 text-blue-500">
                        <FileEmpty02Icon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          README.md
                        </span>
                        <span className="mt-0.5 text-xs text-slate-500">
                          16 MB
                        </span>
                      </div>
                      <div className="p-1 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-800">
                        <Download04Icon className="size-4" />
                      </div>
                    </div>

                    <div className="group border-border flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="rounded-lg border border-purple-100 bg-purple-50 p-2.5 text-purple-500">
                        <FileEmpty02Icon className="size-5" />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                          .cursor
                        </span>
                        <span className="mt-0.5 text-xs text-slate-500">
                          12.50 MB
                        </span>
                      </div>
                      <div className="p-1 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-800">
                        <Download04Icon className="size-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Project;
