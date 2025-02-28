"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function FAQ() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our subtitle generator",
      faqs: [
        {
          question: "How accurate are the generated subtitles?",
          answer: "Our AI-powered subtitle generator achieves up to 99% accuracy in speech recognition and translation, ensuring professional-quality results for your videos."
        },
        {
          question: "Which languages are supported?",
          answer: "We support over 50 languages for subtitle generation, including major languages like English, Spanish, French, German, Chinese, Japanese, and many more."
        },
        {
          question: "How long does it take to process a video?",
          answer: "Processing time depends on the video length, but most videos are completed within minutes. A 10-minute video typically takes 2-3 minutes to process."
        },
        {
          question: "What video formats are supported?",
          answer: "We support all major video formats including MP4, MOV, AVI, WMV, and more. Maximum file size is 2GB for standard plans."
        },
        {
          question: "Can I edit the generated subtitles?",
          answer: "Yes, you can edit, adjust timing, and customize the style of your subtitles through our intuitive editor interface."
        },
        {
          question: "What export formats are available?",
          answer: "You can export subtitles in various formats including SRT, VTT, and directly embedded in your video file."
        }
      ]
    },
    es: {
      title: "Preguntas Frecuentes",
      subtitle: "Encuentra respuestas a preguntas comunes sobre nuestro generador de subtítulos",
      faqs: [
        {
          question: "¿Qué tan precisos son los subtítulos generados?",
          answer: "Nuestro generador de subtítulos impulsado por IA alcanza hasta un 99% de precisión en reconocimiento de voz y traducción, garantizando resultados de calidad profesional para tus videos."
        },
        {
          question: "¿Qué idiomas están soportados?",
          answer: "Soportamos más de 50 idiomas para la generación de subtítulos, incluyendo idiomas principales como inglés, español, francés, alemán, chino, japonés y muchos más."
        },
        {
          question: "¿Cuánto tiempo tarda en procesar un video?",
          answer: "El tiempo de procesamiento depende de la duración del video, pero la mayoría de los videos se completan en minutos. Un video de 10 minutos típicamente tarda 2-3 minutos en procesarse."
        },
        {
          question: "¿Qué formatos de video son compatibles?",
          answer: "Soportamos todos los formatos principales de video incluyendo MP4, MOV, AVI, WMV y más. El tamaño máximo de archivo es 2GB para planes estándar."
        },
        {
          question: "¿Puedo editar los subtítulos generados?",
          answer: "Sí, puedes editar, ajustar el tiempo y personalizar el estilo de tus subtítulos a través de nuestra interfaz de editor intuitiva."
        },
        {
          question: "¿Qué formatos de exportación están disponibles?",
          answer: "Puedes exportar subtítulos en varios formatos incluyendo SRT, VTT y directamente incrustados en tu archivo de video."
        }
      ]
    },
    fr: {
      title: "Questions Fréquentes",
      subtitle: "Trouvez des réponses aux questions courantes sur notre générateur de sous-titres",
      faqs: [
        {
          question: "Quelle est la précision des sous-titres générés ?",
          answer: "Notre générateur de sous-titres alimenté par l'IA atteint jusqu'à 99% de précision dans la reconnaissance vocale et la traduction, assurant des résultats de qualité professionnelle pour vos vidéos."
        },
        {
          question: "Quelles langues sont prises en charge ?",
          answer: "Nous prenons en charge plus de 50 langues pour la génération de sous-titres, y compris les langues principales comme l'anglais, l'espagnol, le français, l'allemand, le chinois, le japonais et bien d'autres."
        },
        {
          question: "Combien de temps faut-il pour traiter une vidéo ?",
          answer: "Le temps de traitement dépend de la durée de la vidéo, mais la plupart des vidéos sont terminées en quelques minutes. Une vidéo de 10 minutes prend généralement 2-3 minutes à traiter."
        },
        {
          question: "Quels formats vidéo sont pris en charge ?",
          answer: "Nous prenons en charge tous les formats vidéo principaux, y compris MP4, MOV, AVI, WMV et plus. La taille maximale du fichier est de 2 Go pour les forfaits standard."
        },
        {
          question: "Puis-je modifier les sous-titres générés ?",
          answer: "Oui, vous pouvez éditer, ajuster le timing et personnaliser le style de vos sous-titres via notre interface d'édition intuitive."
        },
        {
          question: "Quels formats d'exportation sont disponibles ?",
          answer: "Vous pouvez exporter les sous-titres dans différents formats, notamment SRT, VTT et directement intégrés dans votre fichier vidéo."
        }
      ]
    },
    pt: {
      title: "Perguntas Frequentes",
      subtitle: "Encontre respostas para perguntas comuns sobre nosso gerador de legendas",
      faqs: [
        {
          question: "Qual é a precisão das legendas geradas?",
          answer: "Nosso gerador de legendas baseado em IA alcança até 99% de precisão no reconhecimento de fala e tradução, garantindo resultados de qualidade profissional para seus vídeos."
        },
        {
          question: "Quais idiomas são suportados?",
          answer: "Suportamos mais de 50 idiomas para geração de legendas, incluindo idiomas principais como inglês, espanhol, francês, alemão, chinês, japonês e muitos outros."
        },
        {
          question: "Quanto tempo leva para processar um vídeo?",
          answer: "O tempo de processamento depende do comprimento do vídeo, mas a maioria dos vídeos é concluída em minutos. Um vídeo de 10 minutos normalmente leva 2-3 minutos para processar."
        },
        {
          question: "Quais formatos de vídeo são suportados?",
          answer: "Suportamos todos os principais formatos de vídeo, incluindo MP4, MOV, AVI, WMV e mais. O tamanho máximo do arquivo é 2GB para planos padrão."
        },
        {
          question: "Posso editar as legendas geradas?",
          answer: "Sim, você pode editar, ajustar o tempo e personalizar o estilo das suas legendas através da nossa interface intuitiva de edição."
        },
        {
          question: "Quais formatos de exportação estão disponíveis?",
          answer: "Você pode exportar legendas em vários formatos, incluindo SRT, VTT e diretamente incorporadas no seu arquivo de vídeo."
        }
      ]
    }
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const selectedLanguage = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-[#1C1E2A] text-white">
      <NavBar changeLanguage={changeLanguage} selectedLanguage={selectedLanguage} />
      
      <main className="max-w-4xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text">
            {selectedLanguage.title}
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {selectedLanguage.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {selectedLanguage.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#22253A] p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold mb-4 text-[#FF7B7B]">
                {faq.question}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
