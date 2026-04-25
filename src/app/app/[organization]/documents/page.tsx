"use client";

import { DocumentAttachmentIcon } from "hugeicons-react";
import {
  DownloadIcon,
  FileTextIcon,
  SearchIcon,
  SendIcon,
  UploadIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "~/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const documents = [
  {
    name: "Offer Letter - Ritesh Sharma.pdf",
    category: "Offer Letter",
    owner: "People Ops",
    updatedAt: "2026-04-11",
    visibility: "Private",
  },
  {
    name: "Employment Contract - Ashwesha.pdf",
    category: "Contract",
    owner: "People Ops",
    updatedAt: "2026-03-20",
    visibility: "Private",
  },
  {
    name: "Company Leave Policy v2.pdf",
    category: "Policy",
    owner: "HR",
    updatedAt: "2026-04-02",
    visibility: "Company",
  },
  {
    name: "Vendor Service Agreement - CloudInfra.pdf",
    category: "Legal",
    owner: "Finance",
    updatedAt: "2026-02-14",
    visibility: "Restricted",
  },
  {
    name: "Onboarding Checklist Template.docx",
    category: "Template",
    owner: "People Ops",
    updatedAt: "2026-04-08",
    visibility: "Company",
  },
];

export default function DocumentsPage() {
  const [query, setQuery] = useState("");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      return (
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.category.toLowerCase().includes(query.toLowerCase()) ||
        doc.owner.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query]);

  return (
    <main className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <header className="border-border flex flex-wrap items-start justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
              <DocumentAttachmentIcon className="text-primary size-6" />
            </div>
            <div className="">
              <h5 className="text-slate-700">Documents</h5>
              <p className="text-sm">
                Store and download important company and employee documents.
              </p>
            </div>
          </div>

          <Button size="sm" icon={UploadIcon}>
            Upload document
          </Button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Total documents</CardDescription>
              <CardTitle className="text-xl">126</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                Across employee and company folders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Employee documents</CardDescription>
              <CardTitle className="text-xl">48</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                Offer letters, contracts, onboarding docs
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Ready to submit</CardDescription>
              <CardTitle className="text-xl">Signed docs</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs">
                Submit signed offer letters or resignation letters quickly
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader className="border-border border-b">
              <CardTitle className="text-base">Document library</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search document, category, owner..."
                  icon={SearchIcon}
                  iconStyle="size-4 text-muted-foreground"
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead className="text-right">Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileTextIcon className="text-primary size-4" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.owner}</TableCell>
                      <TableCell>{doc.updatedAt}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.visibility}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <Button
                            size="xs"
                            variant="outline"
                            icon={DownloadIcon}
                          >
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submit a document</CardTitle>
              <CardDescription>
                Upload signed offer letters, resignation letters, or related
                official files.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Document type</label>
                <select className="border-input bg-background h-10 w-full rounded-sm border px-3 text-sm outline-none">
                  <option>Signed offer letter</option>
                  <option>Resignation letter</option>
                  <option>Contract addendum</option>
                  <option>Other official document</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Employee name</label>
                <Input placeholder="e.g. Ritesh Sharma" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-medium">Upload file</label>
                <Input type="file" />
              </div>
              <div className="md:col-span-2">
                <Button size="sm" icon={SendIcon}>
                  Submit document
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
