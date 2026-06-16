import { ClubWithImages } from '@/types';
import Image from 'next/image';
import { useClubModalStore } from '@/store/club.store';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { ProductManager } from '../productManager/ProductManager';
import './_clubInfo.scss';

interface Props {
    selectedClub: ClubWithImages;
}

export const ClubInfo = ({ selectedClub }: Props) => {
    const selectClub = useClubModalStore((state) => state.selectClub);
    const logoUrl =
        selectedClub.images.find(
            image => image.type === 'LOGO'
        )?.url ?? '/logo.jpg';

    return (
        <div className="club-info">
            <button onClick={() => selectClub('')} className='club-info-back-button'><BiLeftArrowAlt />Volver a clubes</button>
            <div className="club-info-header">
                <Image src={logoUrl} className='club-logo' alt={selectedClub.name} width={500} height={300} />
                <div className="club-info-header-text">
                    <span className="club-info-header-details">{selectedClub.city} · {selectedClub.discipline} · Fundado {selectedClub.foundedAt}</span>
                    <h1 className="club-name">{selectedClub.name}</h1>
                    <p className="club-description">{selectedClub.description}</p>
                </div>
            </div>

            <div className="club-info-products-stats-container">
                <div className="club-info-products-stats">
                    <span className='club-info-products-stats-title'>Productos</span>
                    <span className='club-info-products-stats-count'>{selectedClub.products.length || 0}</span>
                </div>
                <div className="club-info-products-stats">
                    <span className='club-info-products-stats-title'>Activos</span>
                    <span className='club-info-products-stats-count'>{selectedClub.products.filter(product => product.isActive).length || 0}</span>
                </div>
                <div className="club-info-products-stats">
                    <span className='club-info-products-stats-title'>Stock Total</span>
                    <span className='club-info-products-stats-count'>{selectedClub.products.reduce((total, product) => total + (product.stock ?? 0), 0) || 0}</span>
                </div>
            </div>

            <ProductManager products={selectedClub.products} clubId={selectedClub.id} />
        </div>
    )
}
