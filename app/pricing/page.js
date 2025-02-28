"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Pricing() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the plan that's right for you",
      monthly: "Monthly",
      yearly: "Yearly",
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          description: "Perfect for trying out our services",
          features: [
            "5 videos per month",
            "720p video quality",
            "2 languages",
            "Basic subtitle styles",
            "SRT export format",
            "Email support"
          ],
          cta: "Get Started"
        },
        {
          name: "Pro",
          price: "$29",
          period: "/month",
          description: "Ideal for content creators and small teams",
          features: [
            "50 videos per month",
            "4K video quality",
            "All languages",
            "Advanced subtitle styles",
            "All export formats",
            "Priority support"
          ],
          cta: "Start Pro Trial",
          popular: true
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "",
          description: "For organizations with specific needs",
          features: [
            "Unlimited videos",
            "8K video quality",
            "All languages",
            "Custom subtitle styles",
            "API access",
            "Dedicated support"
          ],
          cta: "Contact Sales"
        }
      ]
    },
    es: {
      title: "Precios Simples y Transparentes",
      subtitle: "Elige el plan que más te convenga",
      monthly: "Mensual",
      yearly: "Anual",
      plans: [
        {
          name: "Gratis",
          price: "$0",
          period: "/mes",
          description: "Perfecto para probar nuestros servicios",
          features: [
            "5 videos por mes",
            "Calidad de video 720p",
            "2 idiomas",
            "Estilos básicos de subtítulos",
            "Formato de exportación SRT",
            "Soporte por email"
          ],
          cta: "Comenzar"
        },
        {
          name: "Pro",
          price: "$29",
          period: "/mes",
          description: "Ideal para creadores de contenido y equipos pequeños",
          features: [
            "50 videos por mes",
            "Calidad de video 4K",
            "Todos los idiomas",
            "Estilos avanzados de subtítulos",
            "Todos los formatos de exportación",
            "Soporte prioritario"
          ],
          cta: "Comenzar Prueba Pro",
          popular: true
        },
        {
          name: "Empresa",
          price: "Personalizado",
          period: "",
          description: "Para organizaciones con necesidades específicas",
          features: [
            "Videos ilimitados",
            "Calidad de video 8K",
            "Todos los idiomas",
            "Estilos personalizados de subtítulos",
            "Acceso API",
            "Soporte dedicado"
          ],
          cta: "Contactar Ventas"
        }
      ]
    },
    fr: {
      title: "Prix Simples et Transparents",
      subtitle: "Choisissez le forfait qui vous convient",
      monthly: "Mensuel",
      yearly: "Annuel",
      plans: [
        {
          name: "Gratuit",
          price: "0€",
          period: "/mois",
          description: "Parfait pour essayer nos services",
          features: [
            "5 vidéos par mois",
            "Qualité vidéo 720p",
            "2 langues",
            "Styles de sous-titres basiques",
            "Format d'export SRT",
            "Support par email"
          ],
          cta: "Commencer"
        },
        {
          name: "Pro",
          price: "29€",
          period: "/mois",
          description: "Idéal pour les créateurs de contenu et les petites équipes",
          features: [
            "50 vidéos par mois",
            "Qualité vidéo 4K",
            "Toutes les langues",
            "Styles de sous-titres avancés",
            "Tous les formats d'export",
            "Support prioritaire"
          ],
          cta: "Essai Pro",
          popular: true
        },
        {
          name: "Entreprise",
          price: "Sur mesure",
          period: "",
          description: "Pour les organisations aux besoins spécifiques",
          features: [
            "Vidéos illimitées",
            "Qualité vidéo 8K",
            "Toutes les langues",
            "Styles de sous-titres personnalisés",
            "Accès API",
            "Support dédié"
          ],
          cta: "Contacter Commercial"
        }
      ]
    },
    pt: {
      title: "Preços Simples e Transparentes",
      subtitle: "Escolha o plano ideal para você",
      monthly: "Mensal",
      yearly: "Anual",
      plans: [
        {
          name: "Grátis",
          price: "R$0",
          period: "/mês",
          description: "Perfeito para experimentar nossos serviços",
          features: [
            "5 vídeos por mês",
            "Qualidade de vídeo 720p",
            "2 idiomas",
            "Estilos básicos de legendas",
            "Formato de exportação SRT",
            "Suporte por email"
          ],
          cta: "Começar"
        },
        {
          name: "Pro",
          price: "R$149",
          period: "/mês",
          description: "Ideal para criadores de conteúdo e pequenas equipes",
          features: [
            "50 vídeos por mês",
            "Qualidade de vídeo 4K",
            "Todos os idiomas",
            "Estilos avançados de legendas",
            "Todos os formatos de exportação",
            "Suporte prioritário"
          ],
          cta: "Iniciar Trial Pro",
          popular: true
        },
        {
          name: "Empresarial",
          price: "Personalizado",
          period: "",
          description: "Para organizações com necessidades específicas",
          features: [
            "Vídeos ilimitados",
            "Qualidade de vídeo 8K",
            "Todos os idiomas",
            "Estilos personalizados de legendas",
            "Acesso API",
            "Suporte dedicado"
          ],
          cta: "Contatar Vendas"
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
      
      <main className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text">
            {selectedLanguage.title}
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {selectedLanguage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedLanguage.plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-[#22253A] rounded-2xl p-8 relative ${
                plan.popular
                  ? "transform scale-105 border-2 border-[#FF7B7B]"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FF7B7B] text-white px-4 py-1 rounded-full text-sm">
                    Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-[#FF7B7B] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  plan.popular
                    ? "bg-[#FF7B7B] hover:bg-[#FF6B6B] text-white"
                    : "border border-[#FF7B7B] text-[#FF7B7B] hover:bg-[#FF7B7B] hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
