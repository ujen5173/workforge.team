"use client";

import { UserGroupIcon } from "hugeicons-react";
import {
  FilterIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneCallIcon,
  SearchIcon,
  UserPlusIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
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

const teamMembers = [
  {
    name: "Ujen Basi",
    email: "ujen@workforge.team",
    role: "CEO",
    department: "Leadership",
    location: "Kathmandu",
    topic: "Quarterly roadmap alignment",
  },
  {
    name: "Ashwesha Aryal",
    email: "ashwesha@workforge.team",
    role: "Product Designer",
    department: "Product",
    location: "Kathmandu",
    topic: "Design feedback for onboarding flow",
  },
  {
    name: "Sujit Poudel",
    email: "sujit@workforge.team",
    role: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    topic: "Release checklist and UI fixes",
  },
  {
    name: "Ritesh Sharma",
    email: "ritesh@workforge.team",
    role: "Customer Success",
    department: "Customer",
    location: "Remote",
    topic: "Pilot customer handover",
  },
  {
    name: "Sushmita Karki",
    email: "sushmita@workforge.team",
    role: "People Ops",
    department: "People",
    location: "Kathmandu",
    topic: "Offer letter and onboarding docs",
  },
];

const hiringPipeline = [
  {
    role: "Senior Frontend Engineer",
    stage: "Interview",
    owner: "Engineering",
  },
  { role: "QA Engineer", stage: "Take-home", owner: "Engineering" },
  { role: "Content Marketer", stage: "Screening", owner: "Growth" },
];

export default function TeamPage() {
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesQuery =
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase()) ||
        member.role.toLowerCase().includes(query.toLowerCase());
      const matchesDepartment =
        departmentFilter === "all" || member.department === departmentFilter;
      return matchesQuery && matchesDepartment;
    });
  }, [query, departmentFilter]);

  return (
    <main className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <header className="border-border flex flex-wrap items-start justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
              <UserGroupIcon className="text-primary size-6" />
            </div>
            <div className="">
              <h5 className="text-slate-700">Teams</h5>
              <p className="text-sm">
                Manage company people in one clean directory.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={MailIcon}>
              Invite by email
            </Button>
            <Button size="sm" icon={UserPlusIcon}>
              Add team member
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardDescription>Total team members</CardDescription>
              <CardTitle className="text-xl">15</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                11 full-time • 4 collaborators
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Departments</CardDescription>
              <CardTitle className="text-xl">6</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                Engineering is currently largest
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader className="border-border border-b">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-base">People workspace</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search member, role, email..."
                  icon={SearchIcon}
                  iconStyle="size-4 text-muted-foreground"
                  className="max-w-sm"
                />
                <div className="flex items-center gap-2">
                  <FilterIcon className="text-muted-foreground size-4" />
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All departments</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="People">People</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quick connect</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.email}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarImage src="" alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="xs"
                            variant="outline"
                            icon={MessageSquareIcon}
                          >
                            Message
                          </Button>
                          <Button
                            size="xs"
                            variant="outline"
                            icon={PhoneCallIcon}
                          >
                            Call
                          </Button>
                          <span className="text-muted-foreground text-xs">
                            Topic: {member.topic}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
