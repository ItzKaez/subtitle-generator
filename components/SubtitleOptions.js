'use client';

const STYLE_PRESETS = {
  default: {
    name: "Default Style",
    description: "Classic white text with black outline",
    preview: "White on Black"
  },
  modern: {
    name: "Modern Style",
    description: "White text with navy blue outline",
    preview: "White on Navy"
  },
  fancy: {
    name: "Fancy Style",
    description: "Gold text with brown outline",
    preview: "Gold on Brown"
  },
  retro: {
    name: "Retro Style",
    description: "Light coral text with slate outline",
    preview: "Coral on Slate"
  }
};

const SubtitleOptions = ({ options = {}, onChange, disabled }) => {
  const { stylePreset = 'default' } = options;

  // Handle style preset change
  const handlePresetChange = (e, preset) => {
    e.preventDefault();
    onChange({ 
      ...options, 
      stylePreset: preset
    });
  };

  return (
    <div className="space-y-6 w-full">
      {/* Style Preset Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Subtitle Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(STYLE_PRESETS).map(([key, preset]) => (
            <div
              key={key}
              onClick={(e) => handlePresetChange(e, key)}
              className={`
                p-4 rounded-lg text-left space-y-2 cursor-pointer
                ${stylePreset === key ? 'ring-2 ring-[#FF7B7B]' : ''}
                ${disabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}
                border border-gray-600
                transition-all duration-200
              `}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePresetChange(e, key);
                }
              }}
            >
              <div className="font-medium text-gray-200">{preset.name}</div>
              <div className="text-sm text-gray-400">{preset.description}</div>
              <div className="text-xs text-gray-500">{preset.preview}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubtitleOptions;
