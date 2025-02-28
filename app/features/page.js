"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Features() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Powerful Features",
      subtitle: "Transform your videos with AI-powered subtitles",
      features: [
        {
          title: "Automatic Subtitle Generation",
          description: "Generate accurate subtitles in seconds using advanced AI technology",
          icon: "⚡"
        },
        {
          title: "Multi-language Support",
          description: "Translate your subtitles into multiple languages instantly",
          icon: "🌍"
        },
        {
          title: "Real-time Editing",
          description: "Edit and fine-tune your subtitles with our intuitive interface",
          icon: "✏️"
        },
        {
          title: "Custom Styling",
          description: "Customize fonts, colors, and positions to match your brand",
          icon: "🎨"
        },
        {
          title: "Platform Integration",
          description: "Seamlessly export to YouTube, Vimeo, and other platforms",
          icon: "🔄"
        },
        {
          title: "Enterprise Security",
          description: "Keep your content secure with enterprise-grade protection",
          icon: "🔒"
        }
      ],
      cta: {
        title: "Ready to Get Started?",
        description: "Join thousands of content creators using Capshun",
        button: "Try It Now"
      }
    },
    es: {
      title: "Características Potentes",
      subtitle: "Transforma tus videos con subtítulos potenciados por IA",
      features: [
        {
          title: "Generación Automática de Subtítulos",
          description: "Genera subtítulos precisos en segundos usando tecnología AI avanzada",
          icon: "⚡"
        },
        {
          title: "Soporte Multilingüe",
          description: "Traduce tus subtítulos a múltiples idiomas instantáneamente",
          icon: "🌍"
        },
        {
          title: "Edición en Tiempo Real",
          description: "Edita y ajusta tus subtítulos con nuestra interfaz intuitiva",
          icon: "✏️"
        },
        {
          title: "Estilo Personalizado",
          description: "Personaliza fuentes, colores y posiciones para coincidir con tu marca",
          icon: "🎨"
        },
        {
          title: "Integración de Plataformas",
          description: "Exporta sin problemas a YouTube, Vimeo y otras plataformas",
          icon: "🔄"
        },
        {
          title: "Seguridad Empresarial",
          description: "Mantén tu contenido seguro con protección de nivel empresarial",
          icon: "🔒"
        }
      ],
      cta: {
        title: "¿Listo para Empezar?",
        description: "Únete a miles de creadores de contenido usando Capshun",
        button: "Pruébalo Ahora"
      }
    },
    fr: {
      title: "Fonctionnalités Puissantes",
      subtitle: "Transformez vos vidéos avec des sous-titres alimentés par l'IA",
      features: [
        {
          title: "Génération Automatique de Sous-titres",
          description: "Générez des sous-titres précis en quelques secondes grâce à l'IA avancée",
          icon: "⚡"
        },
        {
          title: "Support Multilingue",
          description: "Traduisez instantanément vos sous-titres en plusieurs langues",
          icon: "🌍"
        },
        {
          title: "Édition en Temps Réel",
          description: "Éditez et affinez vos sous-titres avec notre interface intuitive",
          icon: "✏️"
        },
        {
          title: "Style Personnalisé",
          description: "Personnalisez les polices, les couleurs et les positions selon votre marque",
          icon: "🎨"
        },
        {
          title: "Intégration de Plateformes",
          description: "Exportez facilement vers YouTube, Vimeo et d'autres plateformes",
          icon: "🔄"
        },
        {
          title: "Sécurité Entreprise",
          description: "Protégez votre contenu avec une sécurité de niveau entreprise",
          icon: "🔒"
        }
      ],
      cta: {
        title: "Prêt à Commencer ?",
        description: "Rejoignez des milliers de créateurs de contenu utilisant Capshun",
        button: "Essayez Maintenant"
      }
    },
    pt: {
      title: "Recursos Poderosos",
      subtitle: "Transforme seus vídeos com legendas alimentadas por IA",
      features: [
        {
          title: "Geração Automática de Legendas",
          description: "Gere legendas precisas em segundos usando tecnologia avançada de IA",
          icon: "⚡"
        },
        {
          title: "Suporte Multilíngue",
          description: "Traduza suas legendas para vários idiomas instantaneamente",
          icon: "🌍"
        },
        {
          title: "Edição em Tempo Real",
          description: "Edite e ajuste suas legendas com nossa interface intuitiva",
          icon: "✏️"
        },
        {
          title: "Estilo Personalizado",
          description: "Personalize fontes, cores e posições para combinar com sua marca",
          icon: "🎨"
        },
        {
          title: "Integração com Plataformas",
          description: "Exporte facilmente para YouTube, Vimeo e outras plataformas",
          icon: "🔄"
        },
        {
          title: "Segurança Empresarial",
          description: "Mantenha seu conteúdo seguro com proteção em nível empresarial",
          icon: "🔒"
        }
      ],
      cta: {
        title: "Pronto para Começar?",
        description: "Junte-se a milhares de criadores de conteúdo usando Capshun",
        button: "Experimente Agora"
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
      
      <main className="max-w-6xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text">
            {selectedLanguage.title}
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {selectedLanguage.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {selectedLanguage.features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#22253A] p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-[#FF7B7B]">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="text-center bg-[#22253A] p-12 rounded-2xl transform hover:scale-[1.02] transition-transform">
          <h2 className="text-3xl font-bold mb-4">
            {selectedLanguage.cta.title}
          </h2>
          <p className="text-gray-300 mb-8">
            {selectedLanguage.cta.description}
          </p>
          <button className="bg-[#FF7B7B] hover:bg-[#FF6B6B] px-8 py-4 rounded-xl font-medium transition-colors transform hover:scale-105">
            {selectedLanguage.cta.button}
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
