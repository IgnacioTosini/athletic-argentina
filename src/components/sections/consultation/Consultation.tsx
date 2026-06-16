import { Title } from '@/components/shared/Title/Title'
import Image from 'next/image'
import './_consultation.scss'

export const Consultation = () => {
    return (
        <div className='consultation' id='consultation'>
            <div className='consultation-image'>
                <Image src='/banner.jpg' fill alt='Consultation' />
            </div>
            <div className='consultation-container'>
                <Title title='Sumate al programa' subTitle='¿Querés que tu club tenga su propia tienda oficial?' />
                <p className='consultation-description'>Sumate a Athletic y llevá la identidad de tu institución al siguiente nivel.</p>
                <div className='consultation-button'>
                    <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">Agendar reunión</a>
                </div>
            </div>
        </div>
    )
}
