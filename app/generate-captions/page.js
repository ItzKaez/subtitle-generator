"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import SubtitleOptions from "@/components/SubtitleOptions";
import VideoPreview from "@/components/VideoPreview";

export default function GenerateCaptions() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [processedVideoUrl, setProcessedVideoUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [subtitleOptions, setSubtitleOptions] = useState({
    font: "Arial",
    color: "white",
    size: "medium",
  });

  // Generate session ID on component mount
  useEffect(() => {
    setSessionId(
      Date.now().toString(36) + Math.random().toString(36).substring(2)
    );
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Poll for progress updates
  useEffect(() => {
    let pollInterval;

    const checkProgress = async () => {
      try {
        const response = await fetch(`/api/upload?sessionId=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          setProgress(data.progress);
          setStatus(data.status);

          if (data.downloadUrl) {
            setProcessedVideoUrl(data.downloadUrl);
            clearInterval(pollInterval);
          }

          if (data.status.includes("Error")) {
            setError(data.status);
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        console.error("Error checking progress:", error);
      }
    };

    if (isUploading && sessionId) {
      pollInterval = setInterval(checkProgress, 1000);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isUploading, sessionId]);

  // Handle file selection
  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      // Revoke previous preview URL if it exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError("");

      // Create new preview URL
      const newPreviewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(newPreviewUrl);
    } else {
      setError("Please select a valid video file");
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a video file");
      return;
    }

    try {
      setIsUploading(true);
      setError("");
      setProgress(0);
      setStatus("Starting upload...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("sessionId", sessionId);
      formData.append("subtitleFont", subtitleOptions.font);
      formData.append("subtitleColor", subtitleOptions.color);
      formData.append("subtitleSize", subtitleOptions.size);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      setStatus("Processing video...");
    } catch (error) {
      setError(error.message);
      setIsUploading(false);
    }
  };

  // Handle download
  const handleDownload = async () => {
    try {
      const response = await fetch(processedVideoUrl);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `subtitled_${fileName}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Cleanup session
      await fetch(`/api/upload/cleanup?sessionId=${sessionId}`, {
        method: "DELETE",
      });
    } catch (error) {
      setError("Failed to download video");
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1E2A] text-white">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Generate Video Captions</h1>
            <p className="text-gray-400">
              Upload your video and customize subtitle options
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`
                w-full h-48 border-3 border-dashed rounded-2xl
                ${
                  isUploading
                    ? "border-[#FF5F5F]"
                    : "border-gray-600 hover:border-[#FF7B7B]"
                }
                transition-all duration-300
                flex flex-col items-center justify-center
                bg-gray-800/50 cursor-pointer
                relative
              `}
              onClick={() =>
                !isUploading && document.getElementById("fileInput").click()
              }
              onDrop={(e) => {
                e.preventDefault();
                if (!isUploading) {
                  handleFileSelect(e.dataTransfer.files[0]);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* Upload Icon */}
              <svg
                className={`w-12 h-12 mb-4 ${
                  isUploading ? "text-[#FF7B7B]" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <p className="text-gray-400">
                {file
                  ? fileName
                  : "Drag and drop your video here or click to browse"}
              </p>

              <input
                id="fileInput"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                disabled={isUploading}
              />
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <ProgressBar
                progress={progress}
                status={status}
                isError={error !== ""}
              />
            )}

            {/* Preview Section */}
            {(previewUrl || processedVideoUrl) && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                {previewUrl && !processedVideoUrl && !isUploading && (
                  <VideoPreview
                    src={previewUrl}
                    subtitleOptions={subtitleOptions}
                    onError={() => setError("Failed to load video preview")}
                    isUploading={isUploading}
                  />
                )}
                {processedVideoUrl && (
                  <VideoPreview
                    src={processedVideoUrl}
                    subtitleOptions={subtitleOptions}
                    onError={() => setError("Failed to load video preview")}
                    isUploading={isUploading}
                    hideSubtitleOverlay={true}
                  />
                )}
              </div>
            )}

            {/* Subtitle Options */}
            <SubtitleOptions
              options={subtitleOptions}
              onChange={setSubtitleOptions}
              disabled={isUploading}
            />

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {!processedVideoUrl && (
                <button
                  type="submit"
                  disabled={!file || isUploading}
                  className={`
                    px-8 py-3 rounded-xl font-medium
                    ${
                      !file || isUploading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-[#FF7B7B] hover:bg-[#FF5F5F] transform hover:scale-105"
                    }
                    transition-all duration-300
                  `}
                >
                  {isUploading ? "Processing..." : "Generate Subtitles"}
                </button>
              )}

              {processedVideoUrl && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="
                    px-8 py-3 rounded-xl font-medium
                    bg-[#FF7B7B] hover:bg-[#FF5F5F]
                    transform hover:scale-105
                    transition-all duration-300
                    flex items-center gap-2
                  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Video
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
