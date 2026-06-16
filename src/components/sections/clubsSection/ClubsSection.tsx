import { Title } from '@/components/shared/Title/Title';
import Image from 'next/image';
import { ClubWithImages } from '@/types';
import Link from 'next/link';
import './_clubsSection.scss';

interface Props {
    clubs: ClubWithImages[];
}

export const ClubsSection = ({ clubs = [] }: Props) => {
    return (
        <div className="clubs-section" id="clubes">
            <div className="clubs-section-container">
                <Title title='01 / Confianza' subTitle='Clubes que ya confían en Athletic' />
                <p className="clubs-section-description">Instituciones de todo el país construyen su identidad y monetizan su comunidad junto a nosotros.</p>
                <div className="clubs-section-cards">
                    {
                        clubs.map((club) => (
                            <Link key={club.id} href={`/clubes/${club.slug}`} className="clubs-section-card">
                                <Image src={club.images[0]?.url || '/banner2.jpg'} alt={club.name} fill className="clubs-section-card-image" />
                                <div className="clubs-section-card-content">
                                    <span className="clubs-section-card-info">{club.discipline} · {club.city}</span>
                                    <h3 className="clubs-section-card-name">{club.name}</h3>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
