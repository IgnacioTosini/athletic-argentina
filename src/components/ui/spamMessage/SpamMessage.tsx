import { Title } from '@/components/shared/Title/Title';
import './_spamMessage.scss';

interface Props {
    clubName: string;
}

export const SpamMessage = ({ clubName }: Props) => {
    return (
        <div className='spam-message'>
            <Title title='Tu compra suma' subTitle='El club recibe
ingresos directos' />

            <p className='spam-message-text'>{`Cada producto comprado en esta tienda genera ingresos para Club ${clubName}. Athletic se encarga de la producción, logística, pagos y atención. El club potencia su identidad y su economía.`}</p>
        </div>
    )
}
