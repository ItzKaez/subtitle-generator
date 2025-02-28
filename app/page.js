"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Home() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      hero: {
        title: "AI-Powered Video Captions",
        subtitle: "Transform your videos with accurate, dynamic subtitles in over 50+ languages. Perfect for content creators, businesses, and educators.",
        tryNow: "Try it Now",
        learnMore: "Learn More"
      },
      features: {
        title: "Why Choose Dynamic Captions?",
        items: [
          {
            title: "Fast Processing",
            description: "Generate accurate subtitles in minutes using our advanced AI technology."
          },
          {
            title: "Multiple Languages",
            description: "Support for over 50+ languages with high accuracy translation."
          },
          {
            title: "Easy Export",
            description: "Export subtitles in multiple formats including SRT, VTT, and more."
          }
        ]
      },
      stats: {
        languages: "50+",
        languagesLabel: "Languages Supported",
        accuracy: "99%",
        accuracyLabel: "Accuracy Rate",
        videos: "1M+",
        videosLabel: "Videos Processed",
        support: "24/7",
        supportLabel: "Customer Support"
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of content creators who trust Dynamic Captions for their video subtitle needs.",
        button: "Try it Now - It's Free"
      }
    },
    es: {
      hero: {
        title: "Subtítulos de Video Impulsados por IA",
        subtitle: "Transforma tus videos con subtítulos precisos y dinámicos en más de 50 idiomas. Perfecto para creadores de contenido, empresas y educadores.",
        tryNow: "Pruébalo Ahora",
        learnMore: "Más Información"
      },
      features: {
        title: "¿Por Qué Elegir Dynamic Captions?",
        items: [
          {
            title: "Procesamiento Rápido",
            description: "Genera subtítulos precisos en minutos usando nuestra tecnología avanzada de IA."
          },
          {
            title: "Múltiples Idiomas",
            description: "Soporte para más de 50 idiomas con traducción de alta precisión."
          },
          {
            title: "Exportación Fácil",
            description: "Exporta subtítulos en múltiples formatos incluyendo SRT, VTT y más."
          }
        ]
      },
      stats: {
        languages: "50+",
        languagesLabel: "Idiomas Soportados",
        accuracy: "99%",
        accuracyLabel: "Tasa de Precisión",
        videos: "1M+",
        videosLabel: "Videos Procesados",
        support: "24/7",
        supportLabel: "Soporte al Cliente"
      },
      cta: {
        title: "¿Listo para Empezar?",
        subtitle: "Únete a miles de creadores de contenido que confían en Dynamic Captions para sus necesidades de subtítulos.",
        button: "Pruébalo Ahora - Es Gratis"
      }
    },
    fr: {
      hero: {
        title: "Sous-titres Vidéo Alimentés par l'IA",
        subtitle: "Transformez vos vidéos avec des sous-titres précis et dynamiques dans plus de 50 langues. Parfait pour les créateurs de contenu, les entreprises et les éducateurs.",
        tryNow: "Essayez Maintenant",
        learnMore: "En Savoir Plus"
      },
      features: {
        title: "Pourquoi Choisir Dynamic Captions ?",
        items: [
          {
            title: "Traitement Rapide",
            description: "Générez des sous-titres précis en quelques minutes grâce à notre technologie IA avancée."
          },
          {
            title: "Langues Multiples",
            description: "Prise en charge de plus de 50 langues avec une traduction haute précision."
          },
          {
            title: "Export Facile",
            description: "Exportez les sous-titres dans plusieurs formats, y compris SRT, VTT et plus."
          }
        ]
      },
      stats: {
        languages: "50+",
        languagesLabel: "Langues Supportées",
        accuracy: "99%",
        accuracyLabel: "Taux de Précision",
        videos: "1M+",
        videosLabel: "Vidéos Traitées",
        support: "24/7",
        supportLabel: "Support Client"
      },
      cta: {
        title: "Prêt à Commencer ?",
        subtitle: "Rejoignez des milliers de créateurs de contenu qui font confiance à Dynamic Captions pour leurs besoins en sous-titres.",
        button: "Essayez Maintenant - C'est Gratuit"
      }
    },
    pt: {
      hero: {
        title: "Legendas de Vídeo Alimentadas por IA",
        subtitle: "Transforme seus vídeos com legendas precisas e dinâmicas em mais de 50 idiomas. Perfeito para criadores de conteúdo, empresas e educadores.",
        tryNow: "Experimente Agora",
        learnMore: "Saiba Mais"
      },
      features: {
        title: "Por Que Escolher Dynamic Captions?",
        items: [
          {
            title: "Processamento Rápido",
            description: "Gere legendas precisas em minutos usando nossa tecnologia avançada de IA."
          },
          {
            title: "Múltiplos Idiomas",
            description: "Suporte para mais de 50 idiomas com tradução de alta precisão."
          },
          {
            title: "Exportação Fácil",
            description: "Exporte legendas em vários formatos, incluindo SRT, VTT e mais."
          }
        ]
      },
      stats: {
        languages: "50+",
        languagesLabel: "Idiomas Suportados",
        accuracy: "99%",
        accuracyLabel: "Taxa de Precisão",
        videos: "1M+",
        videosLabel: "Vídeos Processados",
        support: "24/7",
        supportLabel: "Suporte ao Cliente"
      },
      cta: {
        title: "Pronto para Começar?",
        subtitle: "Junte-se a milhares de criadores de conteúdo que confiam no Dynamic Captions para suas necessidades de legendas.",
        button: "Experimente Agora - É Gratis"
      }
    }
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const selectedLanguage = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-[#1C1E2A] text-white">
      <NavBar changeLanguage={changeLanguage} selectedLanguage={selectedLanguage} />
      
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20 lg:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8">
            <span className="bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text animate-gradient">
              {selectedLanguage.hero.title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {selectedLanguage.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate-captions"
              className="bg-[#FF7B7B] hover:bg-[#FF6B6B] px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {selectedLanguage.hero.tryNow}
            </Link>
            <Link
              href="#features"
              className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/50"
            >
              {selectedLanguage.hero.learnMore}
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text">
              {selectedLanguage.features.title}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {selectedLanguage.features.items.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#22253A] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-[#FF7B7B]/20 rounded-lg flex items-center justify-center mb-6">
                  {index === 0 && (
                    <svg className="w-6 h-6 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-6 h-6 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-6 h-6 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 lg:py-32 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {Object.entries(selectedLanguage.stats).reduce((acc, [key, value], index) => {
              if (!key.includes('Label')) {
                acc.push(
                  <div key={key} className="text-center transform transition-all duration-300 hover:scale-105">
                    <h4 className="text-3xl sm:text-4xl font-bold text-[#FF7B7B] mb-2">{value}</h4>
                    <p className="text-gray-400">{selectedLanguage.stats[key + 'Label']}</p>
                  </div>
                );
              }
              return acc;
            }, [])}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 text-center">
          <div className="bg-[#22253A] rounded-3xl p-12 shadow-2xl transform transition-all duration-300 hover:shadow-[#FF7B7B]/10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text">
                {selectedLanguage.cta.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {selectedLanguage.cta.subtitle}
            </p>
            <Link
              href="/generate-captions"
              className="inline-block bg-[#FF7B7B] hover:bg-[#FF6B6B] px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {selectedLanguage.cta.button}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
