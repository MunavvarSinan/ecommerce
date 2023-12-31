import { create } from "zustand";

interface StoreModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  currentStoreId?: string;
}

export const useStoreModal = create<StoreModalStore>((set) => ({
  isOpen: false,
  openModal: () => { set({ isOpen: true }); },
  closeModal: () => { set({ isOpen: false }); },
  currentStoreId: undefined,
}));
