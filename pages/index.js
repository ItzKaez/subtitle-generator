'use client'
import { useState, useEffect } from 'react';
import Header from '../components/Header';

const videoSrc = '/vid.mp4';

// Default dark theme colors
const darkTheme = {
  background: 'bg-gray-900',
  text: 'text-gray-100',
  card: 'bg-gray-800',
  input: 'bg-gray-700 text-white',
  button: 'bg-blue-600', // Set button color to blue
  footer: 'bg-gray-800'
};

export default function Home() {
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));
  const [fileName, setFileName] = useState(''); // State for file n
  const [isUploading, setIsUploading] = useState(false); // State to track upload status
  const [processingStatus, setProcessingStatus] = useState('idle'); // 'idle' | 'processing' | 'ready' | 'error'
  const [processedVideoPath, setProcessedVideoPath] = useState(''); // Path to processed video
  const [errorMessage, setErrorMessage] = useState(''); // Store processing errors

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const data = new FormData();
      data.set('file', file);
      data.set('sessionId', sessionId); // Include session ID in the form data
      setIsUploading(true); // Set uploading state to true
      setProcessingStatus('processing'); // Set processing state
      const processedPath = "public/tmp/"+sessionId+"/video_with_subtitles.mp4" 
      console.log("processed video path = ", processedPath) // Use processedPath instead
      setProcessedVideoPath(processedPath)

      const res = await fetch('/api/upload', {
        headers: {
          'X-Session-Id': sessionId, // Include session ID in the request headers
        },
        method: 'POST',
        body: data
      });

      console.log(sessionId)

      // Start polling for processing status
      const interval = setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/processing-status?sessionId=${sessionId}`);
          if (statusRes.ok) {
            const { status } = await statusRes.json();
            setProcessingStatus(status);
            
            if (status === 'ready') {
              clearInterval(interval);
              setProcessedVideoPath(`/api/download?sessionId=${sessionId}`);
            }
            
            if (status === 'error') {
              clearInterval(interval);
              setErrorMessage('Video processing failed - please try again');
            }
          }
        } catch (error) {
          console.error('Error checking processing status:', error);
          clearInterval(interval);
          setProcessingStatus('error');
          setErrorMessage('Failed to check processing status');
        }
      }, 2000);

      // Wait for processing to complete
      const { outputPath } = await res.json(); // Ensure the output path is correctly retrieved

      clearInterval(interval);
      setProcessedVideoPath(outputPath);

      if (!res.ok) {
        throw new Error(await res.text());
      }
      console.log('File uploaded successfully');
      setFile(null); // Reset file input after upload
      setIsUploading(false); // Reset uploading state
      setFileName(''); // Reset file name after upload
    } catch (e) {
      console.error(e);
    }
  };

  const [language, setLanguage] = useState('en');

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
      downloadButton: "Download video"
    },
    es: {
      uploadTitle: "Sube tu video",
      uploadDescription: "Sube tu archivo de video para generar subtítulos dinámicos.",
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
      downloadButton: "Descargar video"
    },
    fr: {
      uploadTitle: "Téléversez votre vidéo",
      uploadDescription: "Téléversez votre fichier vidéo pour générer des sous-titres dynamiques.",
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
      downloadButton: "Télécharger la vidéo"
    },
    pt: {
      uploadTitle: "Carregar seu vídeo",
      uploadDescription: "Carregue seu arquivo de vídeo para gerar legendas dinâmicas.",
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
      downloadButton: "Baixar vídeo"
    }
  };

  const selectedLanguage = translations[language];

  return (
    <div className={`${darkTheme.background} ${darkTheme.text} min-h-screen overflow-x-hidden`}>
      <Header changeLanguage={changeLanguage} selectedLanguage={selectedLanguage} />
      <main className={`container mx-auto p-4 ${darkTheme.text}`}>
        <section className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4" id="uploadTitle">
            {selectedLanguage.uploadTitle}
          </h1>
          <p className="text-lg mb-8" id="uploadDescription">
            {selectedLanguage.uploadDescription}
          </p>
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto">
            <div className={`${darkTheme.card} h-[50vh] p-2 md:p-4 rounded-lg shadow-md w-full md:w-1/2`}>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="block text-left text-gray-300 font-bold mb-2" id="selectVideoLabel">
                    {selectedLanguage.selectVideoLabel}
                  </label>
                  <div 
                    className={`w-full h-32 border-dashed border-2 border-gray-400 flex items-center justify-center ${darkTheme.input}`} 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => !isProcessing && document.getElementById('videoInput').click()} 
                    onDrop={(e) => {
                      e.preventDefault();
                      if (isProcessing) return;
                      const files = e.dataTransfer.files;
                      if (files.length > 0 && files[0].type.startsWith('video/')) {
                        setFile(files[0]);
                        setFileName(files[0].name);
                      } else {
                        alert('Please drop a valid video file.'); 
                      }
                    }} 
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <p className="text-gray-500">
                      {file ? fileName : selectedLanguage.dragAndDropMessage}
                    </p>
                  </div>

                  <button 
                    type="button" 
                    className={`${darkTheme.button} text-white bg-blue-600 hover:bg-blue-700 mt-2 px-4 py-2 md:px-6 md:py-3 rounded-full w-full`} 
                    id="chooseButton" 
                    onClick={() => processingStatus === 'idle' && document.getElementById('videoInput').click()} 
                    style={{ display: !file ? 'block' : 'none' }} 
                    disabled={processingStatus !== 'idle'}
                  >
                    {selectedLanguage.selectVideoLabel}
                  </button>
                  <input 
                    className={`w-full h-32 border-dashed border-2 border-gray-400 flex items-center justify-center ${darkTheme.input}`} 
                    id="videoInput" 
                    name="video" 
                    type="file" 
                    accept="video/*" 
                    style={{ display: 'none' }} 
                    onChange={(e) => { 
                      if (e.target.files.length > 0 && e.target.files[0].type.startsWith('video/')) { 
                        setFile(e.target.files[0]); 
                        setFileName(e.target.files[0].name); 
                      } else { 
                        setFile(null); 
                        setFileName(''); 
                        alert('Please select a valid video file.'); 
                      } 
                    }} 
                    disabled={processingStatus !== 'idle'}
                  />

                  <button 
                    type="button" 
                    className={`${darkTheme.button} ${isUploading || processingStatus !== 'idle' ? 'bg-gray-400' : 'text-white bg-blue-600 hover:bg-blue-700'} mt-2 px-4 py-2 md:px-6 md:py-3 rounded-full w-full`} 
                    id="uploadButton" 
                    onClick={onSubmit} 
                    style={{ display: file ? 'block' : 'none' }} 
                    disabled={processingStatus !== 'idle' || isUploading || !file}
                  >
                    {isUploading ? (
                      <>
                        Uploading <img src="/spinning.gif" alt="Loading" className="inline-block w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      selectedLanguage.uploadButton
                    )}
                  </button>

                  <button 
                    type="button" 
                    className={`${darkTheme.button} text-white px-4 py-2 md:px-6 md:py-3 rounded-full w-full mt-auto`} 
                    id="downloadButton" 
                    onClick={async () => {
                      try {
                        const videoPath = `tmp/${sessionId}/video_with_subtitles.mp4`;
                        
                        // Trigger the download
                        const response = await fetch(videoPath);
                        if (!response.ok) {
                          console.error('Failed to fetch video:', response.statusText);
                          return;
                        }

                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = 'video_with_subtitles.mp4';
                        
                        // Start the download and wait for it to begin
                        await new Promise((resolve) => {
                          a.addEventListener('click', resolve, { once: true });
                          a.click();
                        });
                        
                        // Clean up the URL
                        window.URL.revokeObjectURL(url);
                        
                        // Call cleanup endpoint
                        const cleanupResponse = await fetch('/api/upload/cleanup', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ sessionId }),
                        });
                        
                        if (!cleanupResponse.ok) {
                          console.error('Failed to cleanup files:', cleanupResponse.statusText);
                        }
                        
                        // Reset states after successful download and cleanup
                        setProcessingStatus('idle');
                        setFile(null);
                        setFileName('');
                        setProcessedVideoPath('');
                        
                      } catch (error) {
                        console.error('Error during download and cleanup:', error);
                      }
                    }}
                  >
                    {selectedLanguage.downloadButton}
                  </button>
                </div>
              </form>
            </div>
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold mb-4" id="livePreviewTitle">
                {selectedLanguage.livePreviewTitle}
              </h2>
              <div className="mb-8 md:mb-20">
                <div className="flex justify-center w-full">
                  <video 
                    className="w-full md:w-2/3 lg:w-1/2 max-w-md h-auto max-h-[50vh] md:max-h-none" 
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
      <footer className={`${darkTheme.footer} text-white text-center p-4`}>
        <p>{selectedLanguage.rights}</p>
      </footer>
    </div>
  );
}
