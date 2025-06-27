/**
 * Loading Spinner Component
 * Komponen loading yang elegan untuk AI processing
 */

'use client';

export default function LoadingSpinner({ 
  size = 'md', 
  message = 'Loading...', 
  progress = null,
  className = '' 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinning Circle */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-accent-color rounded-full animate-spin`}></div>
        
        {/* Inner Circle */}
        <div className={`absolute inset-2 ${sizeClasses[size]} border-2 border-gray-100 border-b-secondary-color rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Center Dot */}
        <div className="absolute inset-1/2 w-2 h-2 bg-accent-color rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      {/* Progress Bar (jika ada) */}
      {progress !== null && (
        <div className="w-full max-w-xs mt-4">
          <div className="flex justify-between text-sm text-text-secondary mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent-color to-secondary-color h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Loading Message */}
      <p className={`mt-4 text-center text-text-secondary ${textSizeClasses[size]} font-medium`}>
        {message}
      </p>

      {/* Animated Dots */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-accent-color rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-accent-color rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-accent-color rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

/**
 * AI Processing Spinner
 * Spinner khusus untuk AI processing dengan animasi yang lebih kompleks
 */
export function AIProcessingSpinner({ message = 'AI sedang memproses...', stage = 'processing' }) {
  const stages = {
    'analyzing': { icon: '🔍', text: 'Menganalisis gambar...' },
    'processing': { icon: '🤖', text: 'Memproses AI Try-On...' },
    'rendering': { icon: '🎨', text: 'Merender hasil...' },
    'finalizing': { icon: '✨', text: 'Menyelesaikan...' }
  };

  const currentStage = stages[stage] || stages.processing;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black bg-opacity-50 rounded-lg">
      {/* AI Icon dengan animasi */}
      <div className="text-6xl mb-4 animate-pulse">
        {currentStage.icon}
      </div>

      {/* Circular Progress */}
      <div className="relative w-20 h-20 mb-6">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset="62.8"
            className="animate-spin"
            style={{ animationDuration: '2s' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#8b7355" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center AI Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm">AI</span>
        </div>
      </div>

      {/* Stage Message */}
      <p className="text-white text-xl font-semibold mb-2">
        {currentStage.text}
      </p>
      
      {/* Custom Message */}
      <p className="text-gray-300 text-sm text-center max-w-xs">
        {message}
      </p>

      {/* Processing Steps */}
      <div className="flex items-center space-x-2 mt-6">
        {Object.keys(stages).map((stageKey, index) => (
          <div
            key={stageKey}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              stageKey === stage 
                ? 'bg-accent-color scale-125' 
                : index < Object.keys(stages).indexOf(stage)
                  ? 'bg-green-500'
                  : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 