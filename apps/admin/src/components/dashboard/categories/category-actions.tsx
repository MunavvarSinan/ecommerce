"use client"


import { Button, buttonVariants } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import t from "react-hot-toast";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { DELETE_CATEGORY } from "@/lib/graphql/admin/mutation/admin";
import type { DETETE_CATEGORY_TYPE } from "@/types";

interface ActionProps {
  disabled?: boolean;
  categoryId: string;
  isPublished: boolean;
}

export const CategoryActions: React.FC<ActionProps> = ({
  disabled,
  categoryId,
  isPublished
}): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const onClick = async (): Promise<void> => {
    console.log('publish');
  };
  const onDelete = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await deleteCategory({
        variables: {
          categoryId
        }
      }) as DETETE_CATEGORY_TYPE;

      if (data.deleteCategory) {
        setLoading(false);
        router.push("/admin/categories");
      }
      t.success(`Category ${data.deleteCategory.name} deleted successfully`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || loading}
        onClick={onClick}
        size="sm"
        variant="outline"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button className={
          cn(
            buttonVariants({
              variant: "destructive"
            })
          )
        } disabled={loading} size="sm" >
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
