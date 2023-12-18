import { DataTableLoading } from "@/components/dashboard/data-table/data-table-loading";

export default function VendorsPageLoading(): JSX.Element {
    return (
        <DataTableLoading
            columnCount={6}
            isNewRowCreatable
            isRowsDeletable
        />
    );
}