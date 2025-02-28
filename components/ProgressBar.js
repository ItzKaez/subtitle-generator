'use client';

const ProgressBar = ({ progress, status, isError }) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className={`${isError ? 'text-red-400' : 'text-gray-300'}`}>
          {status}
        </span>
        <span className="text-gray-300">{progress}%</span>
      </div>
      
      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 rounded-full ${
            isError 
              ? 'bg-red-500' 
              : 'bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F]'
          }`}
          style={{ width: `${progress}%` }}
        >
          {/* Animated gradient effect */}
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
