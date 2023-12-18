import { Checkbox } from "@repo/ui/components/ui/checkbox";

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