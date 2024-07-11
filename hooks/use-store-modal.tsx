import { create } from "zustand";

interface useStoreModalProp{
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useStoreModal = create<useStoreModalProp>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))