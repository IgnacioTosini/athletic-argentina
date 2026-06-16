import { Club } from '@prisma/client'
import './_banner.scss'

interface Props {
  clubs: Club[];
}

export const Banner = ({ clubs }: Props) => {
  const marqueeClubs = clubs.length > 0 ? [...clubs, ...clubs] : [];

  return (
    <section className="banner" aria-label="Marcas destacadas">
      {marqueeClubs.length > 0 ? (
        <div className="bannerViewport">
          <div className="bannerTrack">
            {marqueeClubs.map((club, index) => (
              <p
                key={`${club.id}-${index}`}
                className="bannerItem"
                aria-hidden={index >= clubs.length}
              >
                {club.name}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p className="bannerEmpty">No hay clubes disponibles</p>
      )}
    </section>
  )
}
