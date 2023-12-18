/* eslint-disable react/no-unstable-nested-components */
"use client"

import { type ColumnDef } from '@tanstack/react-table';
import { useMemo, useState, useTransition } from "react";
import { Badge } from '@repo/ui/components/ui/badge';

import type { ProductsTableShellProps, VENDOR_DATA } from "@/types";

import { DataTable } from "../data-table/data-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import DataTableActions, { CheckboxComponent, CheckboxHeader } from '../data-table/data-table-components';




export function VendorsTableShell({
    data,
    pageCount,
}: ProductsTableShellProps): JSX.Element {
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
    // TODO : update table types and also add delete functionality


    const columns = useMemo<ColumnDef<VENDOR_DATA>[]>(
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
                    <DataTableColumnHeader column={column} title="Name" />
                ),

            },
            {
                accessorKey: "email",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Email" />
                ),

            },
            {
                accessorKey: "phone",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Phone" />
                ),
            },
            {
                accessorKey: "address",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Address" />
                ),
            },
            {
                accessorKey: "role",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Role" />
                ),
                cell: ({ cell }) => {
                    const role = cell.getValue();
                    if (typeof role === "string") {
                        return <Badge className='capitalize' variant="secondary">{role}</Badge>
                    }
                }
            },
            {
                id: "actions",
                cell: ({ row }) => (
                    <DataTableActions row={row} />
                )
            }
        ],
        [data],
    );

    return (
        <DataTable
            columns={columns}
            data={data}
            // newRowLink={`/dashboard/stores/${}/products/new`}
            pageCount={pageCount}

        // searchableColumns={[
        //     {
        //         id: "name",
        //         title: "names",
        //     },
        // ]}
        // deleteRowsAction={() => void deleteSelectedRows()}
        />

    )
}