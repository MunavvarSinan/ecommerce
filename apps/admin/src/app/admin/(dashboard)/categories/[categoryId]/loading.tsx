import { DataTableLoading } from "@/components/dashboard/skeleton/data-table-loading";

export default function UpadateCategoryPageLoading(): JSX.Element {
  return <DataTableLoading columnCount={6} isNewRowCreatable isRowsDeletable />;
}
