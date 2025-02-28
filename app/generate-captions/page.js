"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const videoSrc = "/vid.mp4";

// Default dark theme colors
const theme = {
  background: "bg-[#1C1E2A]",
  text: "text-[#FAF3E0]",
  card: "bg-[#22253A]",
  input: "bg-gray-700 text-white",
  button: "bg-[#FF6B6B]",
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
      console.error("No file selected");
      return;
    }

    try {
      const data = new FormData();
      data.set("file", file);
      data.set("sessionId", sessionId);
      setIsUploading(true);
      setProcessingStatus("processing");
      const processedPath =
        "public/tmp/" + sessionId + "/video_with_subtitles.mp4";
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

      setFile(null);
      setFileName("");
    } catch (e) {
      console.error(e);
    }
  };

  const [language, setLanguage] = useState("en");

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const translations = {
    en: {
      uploadTitle: "Upload Your Video",
      uploadDescription:
        "Upload your video file to generate dynamic subtitles.",
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
    <div
      className={`${theme.background} ${theme.text} min-h-screen overflow-x-hidden`}
    >
      <NavBar
        changeLanguage={changeLanguage}
        selectedLanguage={selectedLanguage}
      />
      <main className={`container mx-auto p-4 ${theme.text}`}>
        <section className="text-center my-8">
          <h1
            className="text-5xl font-extrabold mb-6 text-[#FF6B6B]"
            id="uploadTitle"
          >
            {selectedLanguage.uploadTitle}
          </h1>
          <p className="text-xl mb-10 text-[#FAF3E0]" id="uploadDescription">
            {selectedLanguage.uploadDescription}
          </p>
          <div className="flex flex-col gap-15 w-full max-w-2xl mx-auto">
            <div
              className={`${theme.card} h-[510px] p-6 rounded-2xl shadow-lg w-full`}
            >
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-left text-gray-300 font-bold mb-2"
                    id="selectVideoLabel"
                  >
                    {selectedLanguage.selectVideoLabel}
                  </label>
                  <div
                    className={`w-full h-62 border-dashed border-2 border-gray-400 flex items-center justify-center ${theme.input}`}
                    style={{
                      cursor: isAddingSubtitles ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      !isAddingSubtitles &&
                      document.getElementById("videoInput").click()
                    }
                    onDrop={(e) => {
                      e.preventDefault();
                      if (isAddingSubtitles) return;
                      const files = e.dataTransfer.files;
                      if (
                        files.length > 0 &&
                        files[0].type.startsWith("video/")
                      ) {
                        setFile(files[0]);
                        setFileName(files[0].name);
                      } else {
                        alert("Please drop a valid video file.");
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <p className="text-[#FAF3E0]">
                      {isAddingSubtitles
                        ? "Processing..."
                        : file
                        ? fileName
                        : selectedLanguage.dragAndDropMessage}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={`${theme.button} text-white hover:bg-[#f74040] mt-30 px-6 py-3 rounded-xl w-full font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer duration-200`}
                    id="chooseButton"
                    onClick={() =>
                      processingStatus === "idle" &&
                      document.getElementById("videoInput").click()
                    }
                    style={{
                      display:
                        (!file &&
                          !isUploading &&
                          !isAddingSubtitles &&
                          processingStatus === "idle") ||
                        isDownloadComplete
                          ? "block"
                          : "none",
                    }}
                    disabled={processingStatus !== "idle"}
                  >
                    {selectedLanguage.selectVideoLabel}
                  </button>
                  <input
                    className={`w-full h-32 border-dashed border-2 border-gray-400 flex items-center justify-center ${theme.input}`}
                    id="videoInput"
                    name="video"
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (
                        e.target.files.length > 0 &&
                        e.target.files[0].type.startsWith("video/")
                      ) {
                        setFile(e.target.files[0]);
                        setFileName(e.target.files[0].name);
                      } else {
                        setFile(null);
                        setFileName("");
                        alert("Please select a valid video file.");
                      }
                    }}
                    disabled={processingStatus !== "idle"}
                  />

                  <div className="space-y-4">
                    <button
                      type="button"
                      className={`${theme.button} ${
                        isUploading || processingStatus !== "idle"
                          ? "bg-gray-400"
                          : "text-white cursor-pointer hover:bg-[#f74040]"
                      } mt-30 px-6 py-3 rounded-xl w-full font-semibold text-lg shadow-md hover:shadow-lg transition-all`}
                      id="uploadButton"
                      onClick={onSubmit}
                      style={{
                        display:
                          file &&
                          !isAddingSubtitles &&
                          processingStatus !== "ready"
                            ? "block"
                            : "none",
                      }}
                      disabled={
                        processingStatus !== "idle" || isUploading || !file
                      }
                    >
                      {isUploading ? (
                        <>
                          Uploading{" "}
                          <img
                            src="/spinning.gif"
                            alt="Loading"
                            className="inline-block w-4 h-4 animate-spin duration-1000 ease-linear"
                          />
                        </>
                      ) : (
                        selectedLanguage.uploadButton
                      )}
                    </button>

                    {isAddingSubtitles && (
                      <div className="flex flex-col items-center justify-center mt-4">
                        <img
                          src="/spinning.gif"
                          alt="Loading"
                          className="w-16 h-16 mt-10 animate-spin duration-1000 ease-linear"
                        />
                        <p className="text-gray-300 mt-2">
                          {fileDetectedTime
                            ? "Finalizing video..."
                            : "Adding subtitles..."}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`${theme.button} text-white mt-30 px-6 py-3 rounded-xl w-full font-semibold text-lg hover:bg-[#f74040] shadow-md hover:shadow-lg transition-all cursor-pointer`}
                    id="downloadButton"
                    style={{
                      display: processingStatus === "ready" ? "block" : "none",
                    }}
                    onClick={async () => {
                      try {
                        const videoPath = `tmp/${sessionId}/video_with_subtitles.mp4`;
                        const response = await fetch(videoPath);
                        if (!response.ok) {
                          console.error(
                            "Failed to fetch video:",
                            response.statusText
                          );
                          return;
                        }

                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.style.display = "none";
                        a.href = url;
                        a.download = "video_with_subtitles.mp4";

                        await new Promise((resolve) => {
                          a.addEventListener("click", resolve, { once: true });
                          a.click();
                        });

                        window.URL.revokeObjectURL(url);
                        setProcessingStatus("idle");
                        setFile(null);
                        setFileName("");
                        setProcessedVideoPath("");
                        setIsDownloadComplete(true);

                        await new Promise((resolve) =>
                          setTimeout(resolve, 2000)
                        );

                        try {
                          const cleanupResponse = await fetch(
                            "/api/upload/cleanup",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ sessionId }),
                            }
                          );

                          if (!cleanupResponse.ok) {
                            console.error(
                              "Failed to cleanup files:",
                              cleanupResponse.statusText
                            );
                          }
                        } catch (cleanupError) {
                          console.error("Error during cleanup:", cleanupError);
                        }
                      } catch (error) {
                        console.error(
                          "Error during download and cleanup:",
                          error
                        );
                      }
                    }}
                  >
                    {selectedLanguage.downloadButton}
                  </button>
                </div>
              </form>
            </div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-6" id="livePreviewTitle">
                {selectedLanguage.livePreviewTitle}
              </h2>
              <div className=" md:mb-20">
                <div className="flex justify-center w-full">
                  <video
                    className="w-full md:w-2/3 lg:w-1/2 max-w-md h-auto max-h-[70vh] md:max-h-none"
                    loop
                    autoPlay
                    muted
                    playsInline
                    onCanPlay={(e) => e.target.play()}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
