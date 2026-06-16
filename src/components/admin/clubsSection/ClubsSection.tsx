"use client";

import ClubModal from "@/components/admin/clubs/clubModal/ClubModal";
import { Sidebar } from "@/components/admin/sidebar/Sidebar";
import { useClubModalStore } from "@/store/club.store";
import { ClubManager } from "../clubManager/ClubManager";
import { ClubWithImages } from "@/types";
import { ClubInfo } from "../clubInfo/ClubInfo";
import ProductModal from "../products/productModal/ProductModal";
import { useProductModalStore } from "@/store/product.store";
import './_clubsSection.scss';

interface Props {
    clubs: ClubWithImages[];
}

export const ClubsSection = ({ clubs }: Props) => {
    const isOpenClub = useClubModalStore((state) => state.isOpen);
    const closeClub = useClubModalStore((state) => state.close);
    const isOpenProduct = useProductModalStore((state) => state.isOpen);
    const closeProduct = useProductModalStore((state) => state.close);
    const selectedClubId = useClubModalStore((state) => state.selectedClubId);
    const selectedClub = clubs.find(club => club.id === selectedClubId);

    if (!selectedClub) {
        return null;
    }

    return (
        <div className="clubs-section-admin">
            <Sidebar clubs={clubs} />

            {
                selectedClubId ? (
                    <ClubInfo selectedClub={selectedClub! || {}} />
                )
                    :
                    <ClubManager clubs={clubs || []} />
            }

            <ClubModal
                isOpen={isOpenClub}
                onClose={closeClub}
            />

            <ProductModal
                isOpen={isOpenProduct}
                onClose={closeProduct}
            />
        </div>
    );
}
