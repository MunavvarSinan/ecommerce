"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react"
import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@repo/ui/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover"

import { useStoreModal } from "@/lib/store/model"



type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function StoreSwitcher({ className, items = [] }: StoreSwitcherProps): JSX.Element {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItems = items.map((item) => ({
    label: item.name as string,
    value: item.id as string,
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: { value: string, label: string }): void => {
    setOpen(false);
    router.push(`/vendor/${store.value}`);
  };
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
          role="combobox"
          size="sm"
          variant="outline"
        >
          <Store className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  className="text-sm"
                  key={store.value}
                  onSelect={() => { onStoreSelect(store); }}
                >
                  <Store className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.openModal()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
