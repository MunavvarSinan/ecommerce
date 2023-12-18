import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { cn } from "@repo/ui/lib/utils";
import { type Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>): JSX.Element {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              // eslint-disable-next-line no-nested-ternary
              column.getIsSorted() === "desc"
                ? `Sorted descending. Click to sort ascending.`
                : column.getIsSorted() === "asc"
                  ? `Sorted ascending. Click to sort descending.`
                  : `Not sorted. Click to sort ascending.`
            }
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon aria-hidden="true" className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon aria-hidden="true" className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon aria-hidden="true" className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Sort ascending"
            onClick={() => { column.toggleSorting(false); }}
          >
            <ArrowUpIcon
              aria-hidden="true"
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sort descending"
            onClick={() => { column.toggleSorting(true); }}
          >
            <ArrowDownIcon
              aria-hidden="true"
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Hide column"
            onClick={() => { column.toggleVisibility(false); }}
          >
            <EyeNoneIcon
              aria-hidden="true"
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
