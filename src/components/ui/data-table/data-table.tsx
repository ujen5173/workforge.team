"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DataTablePagination } from "./data-table-pagination";

export interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  toolbar?: (table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode;
  expandedRow?: (row: { original: TData }) => React.ReactNode;
  defaultPageSize?: number;
  className?: string;
  actionAfterRowClicked?: {
    status: boolean;
    action: "NAVIGATE_ON_CLICK" | "OPEN_SIDEBAR";
  };
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  toolbar,
  expandedRow,
  defaultPageSize = 10,
  actionAfterRowClicked,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    initialState: {
      pagination: { pageSize: defaultPageSize },
    },
  });

  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {toolbar?.(table)}

      <div className="border-border bg-card overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/50 border-b"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-border/50 border-r px-4 last:border-r-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    onClick={() => {
                      if (!actionAfterRowClicked) return;

                      if (
                        actionAfterRowClicked.action === "NAVIGATE_ON_CLICK"
                      ) {
                        router.push(`/app/projects/task/${row.original.id}`);
                      }
                    }}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      row.getIsExpanded() && "bg-muted/30 border-b-0",
                      "border-border/50 border-b",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="border-border/50 border-r px-4 last:border-r-0"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {row.getIsExpanded() && expandedRow && (
                    <TableRow className="border-border/50 border-b hover:bg-transparent">
                      <TableCell
                        className="border-border/50 border-r p-0 px-4 last:border-r-0"
                        colSpan={columns.length}
                      >
                        <div className="border-border bg-muted/20 border-t px-6 py-4">
                          {expandedRow(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="border-border/50 text-muted-foreground h-32 border-r px-4 text-center last:border-r-0"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
