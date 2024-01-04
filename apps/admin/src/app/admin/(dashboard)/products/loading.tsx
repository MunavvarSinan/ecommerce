import { DataTableLoading } from "@/components/dashboard/skeleton/data-table-loading";

export default function ProductsPageLoading(): JSX.Element {
  return <DataTableLoading columnCount={6} isNewRowCreatable isRowsDeletable />;
}
