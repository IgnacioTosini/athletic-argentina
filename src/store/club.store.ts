import { Club } from "@prisma/client";
import { create } from "zustand";

interface ClubModalStore {
    isOpen: boolean;
    editingClubId: string | null;
    selectedClubId: string | null;
    editingClub?: Club | null;

    selectClub: (id: string) => void;
    openCreate: () => void;
    openEdit: (club: Club) => void;
    close: () => void;
}

export const useClubModalStore =
    create<ClubModalStore>((set) => ({
        isOpen: false,
        editingClubId: null,
        selectedClubId: null,

        openCreate: () =>
            set({
                isOpen: true,
                editingClubId: null,
            }),

        openEdit: (club: Club) =>
            set({
                isOpen: true,
                editingClubId: club.id,
                editingClub: club,
            }),

        close: () =>
            set({
                isOpen: false,
                editingClubId: null,
                editingClub: null,
            }),

        selectClub: (id) =>
            set({
                selectedClubId: id,
            }),
    }));