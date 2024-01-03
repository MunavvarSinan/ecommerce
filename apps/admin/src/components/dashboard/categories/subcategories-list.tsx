"use client"

import { Badge } from "@repo/ui/components/ui/badge"
import { cn } from "@repo/ui/lib/utils"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"

import type { CATEGORIES_DATA } from "@/types"

interface SubcategoriesListProps {
  items: CATEGORIES_DATA[]
  onEdit: (id: string) => void;
}

export const SubcategoriesList = ({ items, onEdit }: SubcategoriesListProps): JSX.Element => {
  const [isMounted, setIsMounted] = useState(false);
  const [subcategories, setSubcategories] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (isMounted) {
      setSubcategories(items)
    }
  }, [isMounted, items])

  const isActive = true;

  return (
    <>
      {subcategories.map((subCategory) => (
        <div
          className={cn(
            "flex items-center gap-x-2 p-3 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
            isActive && "bg-sky-100 border-sky-200 text-sky-700"
          )}
          key={subCategory.id}
        >
          {subCategory.name}
          <div className="ml-auto pr-2 flex items-center gap-x-2">
            <Badge
              className={cn(
                "bg-slate-500",
                isActive && "bg-sky-700"
              )}
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
            <Pencil
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
              onClick={() => { onEdit(subCategory.id); }}
            />
          </div>
        </div>
      ))}
    </>
  )

}

