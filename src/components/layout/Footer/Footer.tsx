"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
/* import { animateFooter } from '@/components/animations/gsap/footerAnimations'; */
import { IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io';
import { navigationItems } from '@/utils/navigationItems';
import { handleSectionNavigation } from '@/utils/navigationHelpers';
import Image from 'next/image';
import './_footer.scss';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      /* animateFooter(footerRef.current!); */
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className='footerContent'>
        <div className='footerContentHeader'>
          <div className='footerContentHeaderBrand'>
            <Image src="/logo.jpg" alt="Athletic Argentina Logo" width={60} height={60} className="footerLogo" />
            <h1>Athletic <span>Argentina</span></h1>
          </div>
          <p className='footerContentHeaderDescription'>Impulsamos la identidad de los clubes de Argentina con indumentaria, tiendas oficiales y nuevas fuentes de ingreso.</p>
          <div className='footerContentHeaderSocialMedia'>
            <Link href='https://www.instagram.com/athleticargentina/' target='_blank' rel='noopener noreferrer'>
              <IoLogoInstagram size={24} />
            </Link>
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target='_blank' rel='noopener noreferrer'>
              <IoLogoWhatsapp size={24} />
            </Link>
          </div>
        </div>
        <ul className='footerContentNavigation'>
          <h2>Accesos rápidos</h2>
          {
            navigationItems.map(item => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={(event) => {
                    if (!item.sectionId) return;

                    handleSectionNavigation({
                      event,
                      pathname,
                      sectionId: item.sectionId,
                    });
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className='footerContentFooter'>
        <div className='footerContentInfo'>
          <h4>© {new Date().getFullYear()} Athletic Argentina. Todos los derechos reservados.</h4>
          <p>Diseñado por Ignacio Tosini</p>
        </div>
      </div>
    </footer>
  )
}
