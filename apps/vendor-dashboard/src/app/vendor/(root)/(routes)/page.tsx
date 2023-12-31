"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/lib/store/model";


const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.openModal);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
