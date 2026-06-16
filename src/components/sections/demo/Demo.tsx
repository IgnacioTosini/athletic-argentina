import { Title } from '@/components/shared/Title/Title';
import { ClubWithImages } from '@/types';
import Link from 'next/link';
import { BiRightArrow } from 'react-icons/bi';
import { ProductList } from '@/components/shared/productList/ProductList';
import './_demo.scss';

interface Props {
    club: ClubWithImages;
}

export const Demo = ({ club }: Props) => {
    if (!club) {
        return null;
    }

    return (
        <div className="demo-section" id="tienda">
            <div className="demo-section-container">
                <div className="demo-section-header">
                    <Title title='04 / Demo' subTitle='Así se vería la tienda de tu club.' />
                    <Link href={`/clubes/${club.slug}`} className="demo-section-card" >
                        Ver demo en vivo <BiRightArrow />
                    </Link>
                </div>
                <ProductList products={club.products} demo name={club.name} slug={club.slug} />
            </div>
        </div>
    )
}
