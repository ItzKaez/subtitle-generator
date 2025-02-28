"use client";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const videoSrc = "/vid.mp4";

// Modern theme with gradients and glass effects
const theme = {
  background: "bg-gradient-to-br via-gray-800 ",
  text: "text-gray-100",
  card: "bg-gray-800/90 backdrop-blur-sm",
  input: "bg-gray-900/80 text-gray-100",
  button: "bg-gradient-to-r from-indigo-600 to-purple-600",
  buttonHover: "hover:from-indigo-700 hover:to-purple-700",
};

export default function page() {
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState(
    Date.now().toString(36) + Math.random().toString(36).substring(2)
  );
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("idle");
  const [processedVideoPath, setProcessedVideoPath] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddingSubtitles, setIsAddingSubtitles] = useState(false);
  const [checkInterval, setCheckInterval] = useState(null);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const [fileDetectedTime, setFileDetectedTime] = useState(null);
  const [subtitleFont, setSubtitleFont] = useState("Arial");
  const [subtitleColor, setSubtitleColor] = useState("white");
  const [subtitleSize, setSubtitleSize] = useState("medium");

  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [checkInterval]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please select a video file first");
      return;
    }

    try {
      const data = new FormData();
      data.set("file", file);
      data.set("sessionId", sessionId);
      data.set("subtitleFont", subtitleFont);
      data.set("subtitleColor", subtitleColor);
      data.set("subtitleSize", subtitleSize);
      
      setIsUploading(true);
      setProcessingStatus("processing");
      setErrorMessage("");
      
      const processedPath = "public/tmp/" + sessionId + "/video_with_subtitles.mp4";
      setProcessedVideoPath(processedPath);

      const res = await fetch("/api/upload", {
        headers: {
          "X-Session-Id": sessionId,
        },
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setIsUploading(false);
      setIsAddingSubtitles(true);

      const checkFileInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `/tmp/${sessionId}/video_with_subtitles.mp4`
          );
          if (response.ok) {
            clearInterval(checkFileInterval);
            setFileDetectedTime(Date.now());
            setTimeout(() => {
              setIsAddingSubtitles(false);
              setProcessingStatus("ready");
              setProcessedVideoPath(
                `/tmp/${sessionId}/video_with_subtitles.mp4`
              );
              setIsUploading(false);
            }, 15000);
          }
        } catch (error) {
          console.log("Waiting for subtitles to be added...");
        }
      }, 1000);

      return () => {
        clearInterval(checkFileInterval);
      };

    } catch (e) {
      console.error(e);
      setErrorMessage(e.message || "An error occurred while processing your video");
      setIsUploading(false);
      setIsAddingSubtitles(false);
      setProcessingStatus("idle");
    }
  };

  const [language, setLanguage] = useState("en");

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const translations = {
    en: {
      uploadTitle: "Upload Your Video",
      uploadDescription: "Upload your video file to generate dynamic subtitles.",
      selectVideoLabel: "Select Video File",
      selectSubtitleLanguageLabel: "Select Subtitle Language",
      selectSubtitleFontLabel: "Select Subtitle Font",
      selectSubtitleColorLabel: "Select Subtitle Color",
      selectSubtitleSizeLabel: "Select Subtitle Size",
      uploadButton: "Upload Video",
      livePreviewTitle: "Subtitle Preview",
      home: "Home",
      features: "Features",
      pricing: "Pricing",
      contact: "Contact",
      rights: "© 2023 Dynamic Subtitles SaaS. All rights reserved.",
      dragAndDropMessage: "Drag and drop your video file here",
      downloadButton: "Download video",
    },
    es: {
      uploadTitle: "Sube tu video",
      uploadDescription:
        "Sube tu archivo de video para generar subtítulos dinámicos.",
      selectVideoLabel: "Seleccionar archivo de video",
      selectSubtitleLanguageLabel: "Seleccionar idioma de subtítulos",
      selectSubtitleFontLabel: "Seleccionar fuente de subtítulos",
      selectSubtitleColorLabel: "Seleccionar color de subtítulos",
      selectSubtitleSizeLabel: "Seleccionar tamaño de subtítulos",
      uploadButton: "Subir video",
      livePreviewTitle: "Vista previa de subtítulos",
      home: "Inicio",
      features: "Características",
      pricing: "Precios",
      contact: "Contacto",
      rights: "© 2023 Dynamic Subtitles SaaS. Todos los derechos reservados.",
      dragAndDropMessage: "Arrastra y suelta tu archivo de video aquí",
      downloadButton: "Descargar video",
    },
    fr: {
      uploadTitle: "Téléversez votre vidéo",
      uploadDescription:
        "Téléversez votre fichier vidéo pour générer des sous-titres dynamiques.",
      selectVideoLabel: "Sélectionner le fichier vidéo",
      selectSubtitleLanguageLabel: "Sélectionner la langue des sous-titres",
      selectSubtitleFontLabel: "Sélectionner la police des sous-titres",
      selectSubtitleColorLabel: "Sélectionner la couleur des sous-titres",
      selectSubtitleSizeLabel: "Sélectionner la taille des sous-titres",
      uploadButton: "Télécharger la vidéo",
      livePreviewTitle: "Aperçu des sous-titres",
      home: "Accueil",
      features: "Fonctionnalités",
      pricing: "Tarifs",
      contact: "Contact",
      rights: "© 2023 Dynamic Subtitles SaaS. Tous droits réservés.",
      dragAndDropMessage: "Glissez-déposez votre fichier vidéo ici",
      downloadButton: "Télécharger la vidéo",
    },
    pt: {
      uploadTitle: "Carregar seu vídeo",
      uploadDescription:
        "Carregue seu arquivo de vídeo para gerar legendas dinâmicas.",
      selectVideoLabel: "Selecionar arquivo de vídeo",
      selectSubtitleLanguageLabel: "Selecionar idioma da legenda",
      selectSubtitleFontLabel: "Selecionar fonte da legenda",
      selectSubtitleColorLabel: "Selecionar cor da legenda",
      selectSubtitleSizeLabel: "Selecionar tamanho da legenda",
      uploadButton: "Carregar vídeo",
      livePreviewTitle: "Pré-visualização de legendas",
      home: "Início",
      features: "Funcionalidades",
      pricing: "Preços",
      contact: "Contato",
      rights: "© 2023 Dynamic Subtitles SaaS. Todos os direitos reservados.",
      dragAndDropMessage: "Arraste e solte seu arquivo de vídeo aqui",
      downloadButton: "Baixar vídeo",
    },
  };

  const selectedLanguage = translations[language];

  return (
    <div className={`${theme.background} ${theme.text} min-h-screen overflow-x-hidden`}>
      <NavBar changeLanguage={changeLanguage} selectedLanguage={selectedLanguage} />
      
      <main className="container mx-auto p-4 relative">
        <div className="absolute inset-0 via-transparent to-transparent pointer-events-none" />
        
        <section className="text-center my-8 relative">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent" id="uploadTitle">
            {selectedLanguage.uploadTitle}
          </h1>
          <p className="text-xl mb-10 text-gray-300" id="uploadDescription">
            {selectedLanguage.uploadDescription}
          </p>

          <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
            {/* Main Upload Card */}
            <div className={`${theme.card} p-8 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-lg transition-all duration-300`}>
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Error Message */}
                {errorMessage && (
                  <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
                    <span>{errorMessage}</span>
                    <button 
                      type="button" 
                      onClick={() => setErrorMessage("")}
                      className="text-red-100 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* File Upload Area */}
                <div className="space-y-4">
                  <label className="block text-left text-gray-300 font-medium mb-2" id="selectVideoLabel">
                    {selectedLanguage.selectVideoLabel}
                  </label>
                  <div
                    className={`
                      w-full h-48 border-3 border-dashed 
                      ${isAddingSubtitles ? 'border-purple-500/30' : 'border-gray-600 hover:border-purple-500/50'} 
                      rounded-2xl transition-all duration-300 ease-in-out
                      flex flex-col items-center justify-center
                      ${theme.input} cursor-pointer
                      group
                    `}
                    onClick={() => !isAddingSubtitles && document.getElementById("videoInput").click()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (isAddingSubtitles) return;
                      const files = e.dataTransfer.files;
                      if (files.length > 0 && files[0].type.startsWith("video/")) {
                        setFile(files[0]);
                        setFileName(files[0].name);
                      } else {
                        setErrorMessage("Please drop a valid video file.");
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {/* Upload Icon */}
                    <svg 
                      className={`w-12 h-12 mb-4 ${isAddingSubtitles ? 'text-purple-500' : 'text-gray-500 group-hover:text-purple-400'} transition-colors duration-300`}
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
                    
                    <p className={`text-lg ${isAddingSubtitles ? 'text-purple-400' : 'text-gray-400 group-hover:text-gray-300'} transition-colors duration-300`}>
                      {isAddingSubtitles ? "Processing..." : file ? fileName : selectedLanguage.dragAndDropMessage}
                    </p>
                  </div>

                  {/* Subtitle Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {/* Font Selection */}
                    <div>
                      <label className="block text-left text-gray-400 text-sm mb-2">
                        {selectedLanguage.selectSubtitleFontLabel}
                      </label>
                      <select
                        className={`${theme.input} w-full rounded-lg px-3 py-2 border border-gray-700 focus:border-purple-500 transition-colors duration-300`}
                        value={subtitleFont}
                        onChange={(e) => setSubtitleFont(e.target.value)}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Chantilly">Chantilly</option>
                      </select>
                    </div>

                    {/* Color Selection */}
                    <div>
                      <label className="block text-left text-gray-400 text-sm mb-2">
                        {selectedLanguage.selectSubtitleColorLabel}
                      </label>
                      <select
                        className={`${theme.input} w-full rounded-lg px-3 py-2 border border-gray-700 focus:border-purple-500 transition-colors duration-300`}
                        value={subtitleColor}
                        onChange={(e) => setSubtitleColor(e.target.value)}
                      >
                        <option value="white">White</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                      </select>
                    </div>

                    {/* Size Selection */}
                    <div>
                      <label className="block text-left text-gray-400 text-sm mb-2">
                        {selectedLanguage.selectSubtitleSizeLabel}
                      </label>
                      <select
                        className={`${theme.input} w-full rounded-lg px-3 py-2 border border-gray-700 focus:border-purple-500 transition-colors duration-300`}
                        value={subtitleSize}
                        onChange={(e) => setSubtitleSize(e.target.value)}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    id="videoInput"
                    name="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files.length > 0 && e.target.files[0].type.startsWith("video/")) {
                        setFile(e.target.files[0]);
                        setFileName(e.target.files[0].name);
                      } else {
                        setFile(null);
                        setFileName("");
                        setErrorMessage("Please select a valid video file.");
                      }
                    }}
                    disabled={processingStatus !== "idle"}
                  />

                  {/* Action Buttons */}
                  <div className="space-y-4 mt-6">
                    {/* Upload Button */}
                    {file && !isAddingSubtitles && processingStatus !== "ready" && (
                      <button
                        type="submit"
                        className={`
                          ${theme.button} ${theme.buttonHover}
                          w-full py-4 rounded-xl font-semibold text-lg
                          shadow-lg shadow-purple-500/20
                          transform transition-all duration-300
                          hover:shadow-purple-500/30 hover:scale-[1.02]
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-center gap-3
                        `}
                        disabled={processingStatus !== "idle" || isUploading}
                      >
                        {isUploading ? (
                          <>
                            <img
                              src="/spinning.gif"
                              alt="Loading"
                              className="w-6 h-6 animate-spin"
                            />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          selectedLanguage.uploadButton
                        )}
                      </button>
                    )}

                    {/* Processing Indicator */}
                    {isAddingSubtitles && (
                      <div className="flex flex-col items-center justify-center py-6">
                        <div className="relative">
                          <img
                            src="/spinning.gif"
                            alt="Processing"
                            className="w-16 h-16 animate-spin"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 via-transparent to-transparent rounded-full" />
                        </div>
                        <p className="text-purple-300 mt-4 text-lg">
                          {fileDetectedTime ? "Finalizing video..." : "Adding subtitles..."}
                        </p>
                      </div>
                    )}

                    {/* Download Button */}
                    {processingStatus === "ready" && (
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const videoPath = `tmp/${sessionId}/video_with_subtitles.mp4`;
                            const response = await fetch(videoPath);
                            if (!response.ok) throw new Error("Failed to fetch video");

                            const blob = await response.blob();
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.style.display = "none";
                            a.href = url;
                            a.download = "video_with_subtitles.mp4";
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);

                            setProcessingStatus("idle");
                            setFile(null);
                            setFileName("");
                            setProcessedVideoPath("");
                            setIsDownloadComplete(true);

                            // Cleanup after download
                            await fetch("/api/upload/cleanup", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ sessionId }),
                            });
                          } catch (error) {
                            setErrorMessage("Error downloading the video. Please try again.");
                            console.error("Download error:", error);
                          }
                        }}
                        className={`
                          ${theme.button} ${theme.buttonHover}
                          w-full py-4 rounded-xl font-semibold text-lg
                          shadow-lg shadow-purple-500/20
                          transform transition-all duration-300
                          hover:shadow-purple-500/30 hover:scale-[1.02]
                          flex items-center justify-center gap-2
                        `}
                      >
                        <svg 
                          className="w-6 h-6" 
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
                        {selectedLanguage.downloadButton}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
