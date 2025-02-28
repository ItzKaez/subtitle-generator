"use client";

import { useRef, useEffect, useState } from "react";

const VideoPreview = ({
  src,
  onLoad,
  onError,
  subtitleOptions = {},
  subtitleText = "Preview Subtitle Text",
  isUploading = false,
  hideSubtitleOverlay = false,
}) => {
  const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const titleRef = useRef(null);

  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (src) {
      setIsLoading(true);
      setError(null);
    }
  }, [src]);

  const handleLoadedData = () => {
    setIsLoading(false);
    setDuration(videoRef.current.duration);
    if (onLoad) onLoad();
    titleRef.current.scrollIntoView({ behavior: 'smooth' });


  };

  const handleError = (e) => {
    setIsLoading(false);
    setError("Failed to load video");
    if (onError) onError(e);
  };

  const handleTimeUpdate = () => {
    if (!isUploading) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Map subtitle size to Tailwind text sizes
  const getTextSizeClass = (size) => {
    const sizeMap = {
      small: "text-lg",
      medium: "text-xl",
      large: "text-2xl",
      "x-large": "text-3xl",
    };
    return sizeMap[size] || "text-xl";
  };

  // Map subtitle color to Tailwind text colors
  const getTextColorClass = (color) => {
    const colorMap = {
      white: "text-white",
      yellow: "text-yellow-400",
      green: "text-green-400",
      cyan: "text-cyan-400",
      pink: "text-pink-400",
    };
    return colorMap[color] || "text-white";
  };

  // Get font class
  const getFontClass = (font) => {
    return `font-${font.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="w-full space-y-4">
      <h2 ref={titleRef} className="text-2xl font-bold mb-4">Preview</h2>


      {/* Video Container */}
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF7B7B] border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-400">
            {error}
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full"
          src={src}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onTimeUpdate={handleTimeUpdate}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            togglePlay();
          }}
        />

        {/* Subtitle Overlay */}
        {!isLoading && !error && !hideSubtitleOverlay && (
          <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none">
            <div
              className={`
              px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm
              ${getTextSizeClass(subtitleOptions.size)}
              ${getTextColorClass(subtitleOptions.color)}
              ${getFontClass(subtitleOptions.font)}
              text-center max-w-[80%] transition-all duration-200
            `}
            >
              {subtitleText}
            </div>
          </div>
        )}

        {/* Play/Pause Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            togglePlay();
          }}
          className={`
            absolute inset-0 flex items-center justify-center
            bg-black/0 hover:bg-black/30 transition-colors duration-200
            ${isLoading ? "hidden" : ""}
          `}
        >
          <div
            className={`
            w-16 h-16 rounded-full bg-black/50 flex items-center justify-center
            transform transition-transform duration-200
            ${isPlaying ? "scale-0" : "scale-100"}
          `}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </div>
        </button>
      </div>

      {/* Video Controls */}
      <div className="space-y-2">
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className={`
            w-full h-2 rounded-full appearance-none
            bg-gray-700
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#FF7B7B]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[#FF7B7B]
            [&::-moz-range-thumb]:cursor-pointer
          `}
        />

        {/* Time Display */}
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
