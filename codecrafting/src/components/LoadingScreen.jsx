import React from 'react';

/**
 * Premium Loading Screen with Circular Spinner
 * Features a smooth fade-in and a modern, tech-focused aesthetic.
 */
const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary-navy overflow-hidden animate-fade-in">
            {/* Background Glows for Depth */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-orange/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse delay-1000"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                {/* Circular Loader */}
                <div className="relative w-20 h-20 mb-8">
                    {/* Background Ring */}
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                    {/* Spinning Ring */}
                    <div className="absolute inset-0 border-4 border-primary-orange border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(245,117,31,0.4)]"></div>
                    
                    {/* Inner Small Pulse Ring */}
                    <div className="absolute inset-4 border-2 border-accent-blue/30 rounded-full animate-ping opacity-20"></div>
                </div>
                
                {/* Branded Text with Gradient */}
                <div className="flex flex-col items-center space-y-3">
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.6em] text-white/50">CodingGroups</h2>
                    <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-primary-orange rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-primary-orange rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-primary-orange rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
