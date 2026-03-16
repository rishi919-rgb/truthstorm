const Logo = ({ className = "w-8 h-8" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id="ts-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4facfe" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
            
            <linearGradient id="ts-grad-2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
        </defs>
        
        {/* Main V shape */}
        <path d="M 12 20 L 32 20 L 50 50 L 68 20 L 88 20 L 50 85 Z" fill="url(#ts-grad)" />
        
        {/* Background cutouts to create parallel lines / interlocking effect */}
        <path d="M 23 20 L 29 20 L 50 55 L 71 20 L 77 20 L 50 65 Z" fill="currentColor" className="text-[#fafafa] dark:text-[#050505]" />
        
        {/* Floating center piece to create depth */}
        <path d="M 45 47 L 55 47 L 50 55 Z" fill="url(#ts-grad-2)" />
        
        {/* Left overlap slice */}
        <path d="M 27 20 L 31 20 L 41 35 L 37 35 Z" fill="currentColor" className="text-[#fafafa] dark:text-[#050505]" />
    </svg>
);

export default Logo;
