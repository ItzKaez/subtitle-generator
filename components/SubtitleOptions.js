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

    </div>
  );
};

export default SubtitleOptions;
