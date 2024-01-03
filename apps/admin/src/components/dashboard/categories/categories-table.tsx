/* eslint-disable react/no-unstable-nested-components */
"use client"

import { type ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import type { CATEGORIES_DATA, CategoriesTableProps } from "@/types";

import { DataTable } from "../data-table/data-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import DataTableActions, { CheckboxComponent, CheckboxHeader } from "../data-table/data-table-components";

// TODO : add types for the data

export default function CategoriesTable({
  data,
  pageCount,
}: CategoriesTableProps): JSX.Element {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  console.log(selectedRowIds)
  const columns = useMemo<ColumnDef<CATEGORIES_DATA>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <CheckboxHeader data={data} setSelectedRowIds={setSelectedRowIds} table={table} />
        ),
        cell: ({ row }) => (
          <CheckboxComponent row={row} setSelectedRowIds={setSelectedRowIds} />
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category Name" />
        ),

      },
      {
        accessorKey: "parent_category_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Parent Category" />
        ),

      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DataTableActions component="categories" row={row} />
        )
      }
    ],
    [data],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
    // selectedRowIds={selectedRowIds}
    // setSelectedRowIds={setSelectedRowIds}
    />
  )

}
