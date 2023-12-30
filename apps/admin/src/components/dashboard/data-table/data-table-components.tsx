import { toast } from "react-hot-toast";
import { useTransition } from "react";
import Link from "next/link";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/ui/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu";

import { catchError } from "@/utils";
import type { CheckboxHeaderProps } from "@/types";

interface Row {
    getIsSelected: () => boolean;
    toggleSelected: (isSelected: boolean) => void;
    original: { id: string };
}

type SetSelectedRowIdsProps = React.Dispatch<React.SetStateAction<string[]>>;

export function CheckboxComponent({ row, setSelectedRowIds }: { row: Row; setSelectedRowIds: SetSelectedRowIdsProps }): JSX.Element {
    const handleCheckboxChange = (value: boolean): void => {
        row.toggleSelected(value);
        setSelectedRowIds((prev: string[]) =>
            value
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
        );
    };

    return (
        <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            className="translate-y-[2px]"
            onCheckedChange={handleCheckboxChange}
        />
    );
}


export const CheckboxHeader = ({ table, setSelectedRowIds, data }: CheckboxHeaderProps): JSX.Element => {
    return (
        <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            className="translate-y-[2px]"
            onCheckedChange={(value: boolean) => {
                table.toggleAllPageRowsSelected(value);
                setSelectedRowIds(
                    value ? data.map((row) => row.id) : [],
                );
            }}
        />
    )

}

interface DataTableActionsMenuProps {
    row: Row; // Replace with specific type based on data structure
};

export default function DataTableActions({
    row,
}: DataTableActionsMenuProps): JSX.Element {
    const { original: item } = row;
    const [isPending, startTransition] = useTransition();
    const deleteAction = (id: string) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`success ${id}`);
            }, 1000);
        });
    }
    const handleDeleteClick = (): void => {
        startTransition(async () => {
            row.toggleSelected(false); // Update selected state

            await toast.promise(
                deleteAction(item.id),
                {
                    loading: "Deleting product...",
                    success: () => "Product deleted successfully.",
                    error: (err: unknown) => catchError(err),
                },
            );
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label="Open menu"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    variant="ghost"
                >
                    <DotsHorizontalIcon aria-hidden="true" className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                    <Link href="/admin/vendors">
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/product/${item.id}`}>View</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    disabled={isPending}
                    onClick={handleDeleteClick}
                >
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >

    )
}
