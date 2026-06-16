import { Title } from '@/components/shared/Title/Title';
import './_process.scss';

const processSteps = [
    {
        number: '01',
        title: 'Diseñamos tu identidad',
        description: 'Creamos una línea de indumentaria exclusiva, fiel a la historia y los colores de tu club.'
    },
    {
        number: '02',
        title: 'Lanzamos tu tienda',
        description: 'Activamos una tienda online personalizada bajo tu marca: athletic.com.ar/tu-club.'
    },
    {
        number: '03',
        title: 'Vendés a tu comunidad',
        description: 'Socios, jugadores, familias e hinchas compran en un solo lugar oficial.'
    },
    {
        number: '04',
        title: 'Generás ingresos',
        description: 'Tu club recibe una participación por cada venta. Sin inversión inicial, sin stock.'
    }
];

export const Process = () => {
    return (
        <div className="process-section" id="como-funciona">
            <div className="process-section-container">
                <Title title='02 / Proceso' subTitle='Cómo funciona' />
                <div className="steps-container">
                    {processSteps.map((step, index) => (
                        <div className="step" key={index}>
                            <h3 className="step-number">{step.number}</h3>
                            <p className="step-title">{step.title}</p>
                            <p className="step-description">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
