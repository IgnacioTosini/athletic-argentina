import { Title } from '@/components/shared/Title/Title';
import { Pencil, Trash2 } from 'lucide-react';
import { useClubModalStore } from '@/store/club.store';
import { deleteClubWithImages } from '@/app/actions/clubWithImages.action';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { ClubWithImages } from '@/types';
import './_clubManager.scss';

interface Props {
    clubs: ClubWithImages[];
}

export const ClubManager = ({ clubs }: Props) => {
    const openEdit = useClubModalStore(state => state.openEdit);
    const selectClub = useClubModalStore((state) => state.selectClub);

    const onDelete = async (clubId: string) => {
        const res = await deleteClubWithImages(clubId);
        if (!res.ok) {
            toast.error('Error al eliminar el club');
        }

        toast.success('Club eliminado correctamente');
    };

    return (
        <div className="club-manager">
            <Title title='Gestión' subTitle='Clubes' />
            <p className='club-manager-description'>Administrá cada club, sus datos y su catálogo oficial.</p>

            <table className='club-table'>
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Club</th>
                        <th>Disciplina</th>
                        <th>Productos</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clubs.map((club: ClubWithImages) => (
                        <tr key={club.id} className='club-row'>
                            <td data-label="Logo" onClick={() => selectClub(club.id)}>
                                <Image src={club.images[0]?.url || '/logo.jpg'} alt={club.name} width={50} height={50} className="club-logo" />
                            </td>
                            <td data-label="Club" onClick={() => selectClub(club.id)} className='club-name'>{club.name}</td>
                            <td data-label="Disciplina">{club.discipline}</td>
                            <td data-label="Productos" className="products-count">
                                {club.products.length || 0}
                            </td>
                            <td data-label="Estado"><span className={club.isActive ? 'status-badge status-active' : 'status-badge status-draft'}>{club.isActive ? 'Activo' : 'Inactivo'}</span></td>
                            <td data-label="Acciones">
                                <div className="actions">
                                    <button
                                        onClick={() => openEdit(club)}
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(club.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
