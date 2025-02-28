'use client';

const SubtitleOptions = ({ options, onChange, disabled }) => {
  const {
    font = 'Arial',
    color = 'white',
    size = 'medium'
  } = options;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {/* Font Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Font Style
        </label>
        <select
          value={font}
          onChange={(e) => onChange({ ...options, font: e.target.value })}
          disabled={disabled}
          className={`
            w-full px-3 py-2 rounded-lg
            ${disabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}
            border border-gray-600 focus:border-[#FF7B7B]
            text-gray-200 focus:outline-none
            transition-colors duration-200
          `}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Chantilly">Chantilly</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Text Color
        </label>
        <select
          value={color}
          onChange={(e) => onChange({ ...options, color: e.target.value })}
          disabled={disabled}
          className={`
            w-full px-3 py-2 rounded-lg
            ${disabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}
            border border-gray-600 focus:border-[#FF7B7B]
            text-gray-200 focus:outline-none
            transition-colors duration-200
          `}
        >
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="cyan">Cyan</option>
          <option value="pink">Pink</option>
        </select>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Text Size
        </label>
        <select
          value={size}
          onChange={(e) => onChange({ ...options, size: e.target.value })}
          disabled={disabled}
          className={`
            w-full px-3 py-2 rounded-lg
            ${disabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}
            border border-gray-600 focus:border-[#FF7B7B]
            text-gray-200 focus:outline-none
            transition-colors duration-200
          `}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="x-large">Extra Large</option>
        </select>
      </div>

      {/* Preview */}
      <div className="md:col-span-3 mt-4">
        <div className={`
          w-full h-24 rounded-lg
          bg-gradient-to-r from-gray-900 to-gray-800
          flex items-center justify-center
          border border-gray-700
          overflow-hidden
          relative
        `}>
          <div className="absolute inset-0 bg-black/50" />
          <p className={`
            relative z-10
            text-${color === 'white' ? 'gray-100' : color}-400
            ${size === 'small' ? 'text-sm' : 
              size === 'medium' ? 'text-base' : 
              size === 'large' ? 'text-lg' : 
              'text-xl'
            }
            font-${font.toLowerCase().replace(' ', '-')}
          `}>
            Preview Subtitle Text
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubtitleOptions;
