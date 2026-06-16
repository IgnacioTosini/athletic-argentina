'use client';

import { useState } from 'react';
import './_renderDoubts.scss';

interface Props {
    doubt: {
        question: string;
        answer: string;
    };
}

export const RenderDoubts = ({ doubt }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`doubts-container-questions-item ${
                isOpen ? 'active' : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="doubts-container-questions-item-header">
                <h3 className="doubts-container-questions-item-title">
                    {doubt.question}
                </h3>

                <span className="doubts-container-questions-item-icon">
                    {isOpen ? '−' : '+'}
                </span>
            </div>

            <div className="doubts-container-questions-item-content">
                <p className="doubts-container-questions-item-text">
                    {doubt.answer}
                </p>
            </div>
        </div>
    );
};