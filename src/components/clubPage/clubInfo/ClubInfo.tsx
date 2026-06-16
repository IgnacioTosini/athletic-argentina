import { ClubWithImages } from '@/types';
import { Title } from '@/components/shared/Title/Title';
import Image from 'next/image';
import { ClubShop } from '../clubShop/ClubShop';
import { SpamMessage } from '@/components/ui/spamMessage/SpamMessage';
import './_clubInfo.scss';

interface Props {
    club: ClubWithImages;
}

export const ClubInfo = ({ club }: Props) => {
    const bannerImage = club.images.find(image => image.type === 'BANNER');
    return (
        <div className='club-info'>
            <div className='club-info-container'>
                <div className='club-info-header'>
                    <Image
                        src={bannerImage?.url || '/banner.jpg'}
                        alt={club.name}
                        fill
                        priority
                        className='club-info-image'
                    />

                    <div className='club-info-overlay' />

                    <div className='club-info-content'>
                        <Title
                            title='Tienda oficial · powered by Athletic'
                            subTitle={club.name}
                        />

                        <p className='club-info-description'>
                            {club.description}
                        </p>

                        <div className='club-info-details'>
                            <div className='club-info-detail'>
                                <span className='club-info-label'>
                                    Fundado
                                </span>
                                <p className='club-info-value'>
                                    {club.foundedAt}
                                </p>
                            </div>

                            <div className='club-info-detail'>
                                <span className='club-info-label'>
                                    Disciplina
                                </span>
                                <p className='club-info-value'>
                                    {club.discipline}
                                </p>
                            </div>

                            <div className='club-info-detail'>
                                <span className='club-info-label'>
                                    URL
                                </span>
                                <p className='club-info-value robot'>
                                    /{club.slug}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ClubShop products={club.products} />
                <SpamMessage clubName={club.name} />
            </div>
        </div>
    )
}
