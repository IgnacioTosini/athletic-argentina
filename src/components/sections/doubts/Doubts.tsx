import { Title } from '@/components/shared/Title/Title'
import { RenderDoubts } from '@/components/ui/renderDoubts/RenderDoubts';
import './_doubts.scss'

const doubts = [
    {
        question: '¿Cuánto cuesta implementar una tienda?',
        answer: 'Cero. Athletic invierte el diseño, la producción y la plataforma. El club no asume costos iniciales.'
    },
    {
        question: '¿Cuánto tiempo lleva el proceso?',
        answer: 'Entre 30 y 45 días desde la firma hasta el lanzamiento público de la tienda.'
    },
    {
        question: '¿El diseño es personalizado?',
        answer: 'Sí. Nuestro equipo creativo trabaja en una línea exclusiva por club, respetando su identidad e historia.'
    },
    {
        question: '¿Qué porcentaje recibe el club?',
        answer: 'El club recibe una participación competitiva por cada venta. Definimos el esquema en la primera reunión.'
    },
    {
        question: '¿Cómo funcionan los pagos?',
        answer: 'Cobros por todos los medios habituales (tarjetas, transferencia, MercadoPago) y liquidaciones mensuales al club.'
    },
    {
        question: '¿Pueden participar clubes de cualquier disciplina?',
        answer: 'Sí. Trabajamos con fútbol, básquet, rugby, hockey, vóley y clubes multideporte. Nuestro objetivo es apoyar a todo tipo de instituciones deportivas.'
    }
]

export const Doubts = () => {
    return (
        <div className='doubts' id='faq'>
            <div className='doubts-container'>
                <div className='doubts-container-header'>
                    <Title title='05 / Dudas' subTitle='Preguntas frecuentes' />
                    <p className='doubts-container-text'>¿Tienes dudas? Aquí te respondemos las preguntas más frecuentes sobre Athletic Argentina. Si no encuentras la respuesta que buscas, no dudes en contactarnos.</p>
                </div>

                <div className='doubts-container-questions'>
                    {doubts.map((doubt, index) => (
                        <RenderDoubts key={index} doubt={doubt} />
                    ))}
                </div>
            </div>
        </div>
    )
}
