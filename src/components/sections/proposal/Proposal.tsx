import { Title } from '@/components/shared/Title/Title';
import { MdArrowRightAlt } from "react-icons/md";
import './_proposal.scss';

const proposalItems = [
    {
        number: '01',
        title: 'Tienda online propia',
        description: 'Cada club cuenta con su espacio oficial bajo su propio dominio.'
    },
    {
        number: '02',
        title: 'Diseños exclusivos',
        description: 'Identidad única para cada institución.'
    },
    {
        number: '03',
        title: 'Producción de calidad',
        description: 'Prendas deportivas profesionales, fabricación nacional.'
    },
    {
        number: '04',
        title: 'Nuevas fuentes de ingresos',
        description: 'Monetización constante para el club sin riesgo.'
    },
    {
        number: '05',
        title: 'Gestión simplificada',
        description: 'Nos ocupamos de stock, logística, pagos y atención.'
    },
    {
        number: '06',
        title: 'Acompañamiento constante',
        description: 'Soporte comercial, marketing y estratégico permanente.'
    }
];

export const Proposal = () => {
    return (
        <div className="proposal-section" id="propuesta">
            <div className="proposal-section-container">
                <Title title='03 / Propuesta' subTitle='Mucho más que
indumentaria deportiva.'/>
                <div className="proposal-section-content">
                    {proposalItems.map((item, index) => (
                        <div className="proposal-section-content-item" key={index}>
                            <div className="proposal-section-content-item-header">
                                <span className="proposal-section-content-item-number">{item.number}</span>
                                <MdArrowRightAlt className="proposal-section-content-item-icon" />
                            </div>
                            <h3 className="proposal-section-content-item-title">{item.title}</h3>
                            <p className="proposal-section-content-item-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
