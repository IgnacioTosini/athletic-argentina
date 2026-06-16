"use client";

import { useClubModalStore } from "@/store/club.store";
import ClubForm from "../clubForm/ClubForm";
import "./_clubModal.scss";

interface ClubModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ClubModal({
    isOpen,
    onClose,
}: ClubModalProps) {
    const editingClubId = useClubModalStore((state) => state.editingClubId);
    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal-backdrop"
                onClick={onClose}
            />

            <aside className="club-modal">
                <header className="club-modal-header">
                    <h2 className="club-modal-title">{editingClubId ? "Editar Club" : "Nuevo Club"}</h2>
                    <button onClick={onClose} className="club-modal-close-button">
                        ✕
                    </button>
                </header>

                <ClubForm />
            </aside>
        </>
    );
}