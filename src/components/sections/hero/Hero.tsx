'use client';

import Image from 'next/image';
import Link from 'next/link';
import './_hero.scss';

export const Hero = () => {
    return (
        <div className="hero">
            <Image src="/heroImage.jpg" alt="Hero Image" fill className="hero-image" />
            <div className="hero-content">
                <span className="hero-subtitle">Athletic Argentina · Programa de tiendas oficiales</span>
                <h1 className="hero-title">Mi Club, Mi Tienda.</h1>
                <p className="hero-description">Creamos la tienda oficial de tu club para que puedas vender indumentaria, fortalecer tu identidad y generar nuevos ingresos.</p>
                <div className="hero-buttons">
                    <a className="hero-button hero-button-primary" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">Solicitar información</a>
                    <Link className="hero-button hero-button-secondary" href={`/#clubes`} rel="noopener noreferrer">Ver clubes asociados</Link>
                </div>

                <div className="hero-stats-container">
                    <div className="hero-stats">
                        <span>+40</span>
                        <p>Clubes en todo el país</p>
                    </div>
                    <div className="hero-stats">
                        <span>100%</span>
                        <p>Diseños personalizados</p>
                    </div>
                    <div className="hero-stats">
                        <span>1:1</span>
                        <p>Tienda online propia</p>
                    </div>
                    <div className="hero-stats">
                        <span>AR</span>
                        <p>Producción nacional</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
