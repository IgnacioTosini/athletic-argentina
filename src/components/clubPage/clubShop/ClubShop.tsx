import { ProductWithImages } from '@/types';
import { Title } from '@/components/shared/Title/Title';
import { ProductList } from '@/components/shared/productList/ProductList';
import './_clubShop.scss';

interface Props {
    products: ProductWithImages[];
}

export const ClubShop = ({ products }: Props) => {
    return (
        <div className='club-shop'>
            <div className='club-shop-container'>
                <Title title='Tienda oficial' subTitle='Indumentaria Oficial' />
                <ProductList products={products} />
            </div>
        </div>
    )
}
