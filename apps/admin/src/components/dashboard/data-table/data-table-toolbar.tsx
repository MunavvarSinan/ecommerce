"use client";

import * as React from "react";
import { Cross2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { Button, buttonVariants } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

import { DataTableFacetedFilter } from "@/components/dashboard/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/dashboard/data-table/data-table-view-options";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types";


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  newRowLink?: string;
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;
};

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  newRowLink,
  deleteRowsAction,
}: DataTableToolbarProps<TData>): JSX.Element {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  className="h-8 w-[150px] lg:w-[250px]"
                  key={String(column.id)}
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  placeholder={`Filter ${column.title}...`}
                  value={
                    table.getColumn(String(column.id))?.getFilterValue() as string | readonly string[] | number | undefined
                  }
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  key={String(column.id)}
                  options={column.options}
                  title={column.title}
                />
              ),
          )}
        {isFiltered ? <Button
          aria-label="Reset filters"
          className="h-8 px-2 lg:px-3"
          onClick={() => { table.resetColumnFilters(); }}
          variant="ghost"
        >
          Reset
          <Cross2Icon aria-hidden="true" className="ml-2 h-4 w-4" />
        </Button> : null}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            aria-label="Delete selected rows"
            className="h-8"
            disabled={isPending}
            onClick={(event) => {
              startTransition(() => {
                table.toggleAllPageRowsSelected(false);
                deleteRowsAction(event);
              });
            }}
            size="sm"
            variant="outline"
          >
            <TrashIcon aria-hidden="true" className="mr-2 h-4 w-4" />
            Delete
          </Button>
        ) : null}
        {newRowLink && !deleteRowsAction && table.getSelectedRowModel().rows.length === 0 ? <Link aria-label="Create new row" href={newRowLink}>
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8",
              }),
            )}
          >
            <PlusCircledIcon aria-hidden="true" className="mr-2 h-4 w-4" />
            New
          </div>
        </Link> : null}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
