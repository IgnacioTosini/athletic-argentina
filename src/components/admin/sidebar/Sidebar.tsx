'use client';

import { useMemo, useState } from 'react';
import { useClubModalStore } from '@/store/club.store';
import { ClubWithImages } from '@/types';
import './_sidebar.scss';

interface Props {
    clubs: ClubWithImages[];
}

export const Sidebar = ({ clubs }: Props) => {
    const [search, setSearch] = useState('');

    const openCreate = useClubModalStore((state) => state.openCreate);
    const selectClub = useClubModalStore((state) => state.selectClub);
    const selectedClubId = useClubModalStore((state) => state.selectedClubId);

    const filteredClubs = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) return clubs;

        return clubs.filter((club) =>
            club.name.toLowerCase().includes(term)
        );
    }, [clubs, search]);

    return (
        <div className="sidebar">
            <div className='stadistics-box'>
                <div className='stadistics-item'>
                    <span className='title'>Clubes</span>
                    <span className='value'>{clubs.length}</span>
                </div>

                <div className='stadistics-item'>
                    <span className='title'>Activos</span>
                    <span className='value'>
                        {clubs.filter(club => club.isActive).length}
                    </span>
                </div>

                <div className='stadistics-item'>
                    <span className='title'>Productos</span>
                    <span className='value'>
                        {clubs.reduce(
                            (acc, club) => acc + club.products.length,
                            0
                        )}
                    </span>
                </div>

                <div className='stadistics-item'>
                    <span className='title'>Stock</span>
                    <span className='value'>
                        {clubs.reduce(
                            (acc, club) =>
                                acc +
                                club.products.reduce(
                                    (sum, product) =>
                                        sum + (product.stock ?? 0),
                                    0
                                ),
                            0
                        )}
                    </span>
                </div>
            </div>

            <button
                onClick={openCreate}
                className='new-club-button'
            >
                + Nuevo Club
            </button>

            <div>
                <input
                    type="text"
                    placeholder="Buscar club..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <ul className='clubs-list'>
                    {filteredClubs.map((club) => (
                        <li
                            key={club.id}
                            onClick={() =>
                                selectClub(club.id)
                            }
                            className={
                                selectedClubId === club.id
                                    ? 'club-item selected'
                                    : 'club-item'
                            }
                        >
                            {club.name}
                            <span>
                                {club.products.length}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};