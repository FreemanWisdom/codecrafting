import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';

const BackButton = ({ className = '' }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-sm font-bold text-primary-navy hover:text-primary-orange transition-colors duration-300 group ${className}`}
        >
            <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={20}
                strokeWidth={2.5}
                className="transform group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back
        </button>
    );
};

export default BackButton;
