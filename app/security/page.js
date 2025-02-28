"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Security() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Security",
      subtitle: "How we protect your data and maintain service security",
      sections: [
        {
          title: "Data Protection",
          icon: "shield",
          content: "We employ industry-standard encryption for all data in transit and at rest. Your videos and personal information are protected using advanced security protocols and regular security audits."
        },
        {
          title: "Infrastructure Security",
          icon: "server",
          content: "Our infrastructure is hosted on secure cloud platforms with multiple layers of security, including firewalls, intrusion detection, and 24/7 monitoring systems."
        },
        {
          title: "Access Control",
          icon: "key",
          content: "We implement strict access controls and authentication mechanisms to ensure only authorized personnel can access sensitive systems and data."
        },
        {
          title: "Compliance",
          icon: "check",
          content: "We maintain compliance with international security standards and regularly update our security measures to meet evolving threats and requirements."
        },
        {
          title: "Security Updates",
          icon: "refresh",
          content: "Our systems are regularly updated with the latest security patches and improvements to protect against known vulnerabilities."
        },
        {
          title: "Incident Response",
          icon: "alert",
          content: "We have a dedicated team and established procedures to quickly respond to and resolve any security incidents that may arise."
        }
      ]
    },
    es: {
      title: "Seguridad",
      subtitle: "Cómo protegemos tus datos y mantenemos la seguridad del servicio",
      sections: [
        {
          title: "Protección de Datos",
          icon: "shield",
          content: "Empleamos encriptación estándar de la industria para todos los datos en tránsito y en reposo. Tus videos e información personal están protegidos mediante protocolos de seguridad avanzados y auditorías regulares."
        },
        {
          title: "Seguridad de Infraestructura",
          icon: "server",
          content: "Nuestra infraestructura está alojada en plataformas cloud seguras con múltiples capas de seguridad, incluyendo firewalls, detección de intrusiones y sistemas de monitoreo 24/7."
        },
        {
          title: "Control de Acceso",
          icon: "key",
          content: "Implementamos controles de acceso estrictos y mecanismos de autenticación para garantizar que solo el personal autorizado pueda acceder a sistemas y datos sensibles."
        },
        {
          title: "Cumplimiento",
          icon: "check",
          content: "Mantenemos el cumplimiento con los estándares internacionales de seguridad y actualizamos regularmente nuestras medidas de seguridad para enfrentar amenazas y requisitos en evolución."
        },
        {
          title: "Actualizaciones de Seguridad",
          icon: "refresh",
          content: "Nuestros sistemas se actualizan regularmente con los últimos parches de seguridad y mejoras para proteger contra vulnerabilidades conocidas."
        },
        {
          title: "Respuesta a Incidentes",
          icon: "alert",
          content: "Tenemos un equipo dedicado y procedimientos establecidos para responder y resolver rápidamente cualquier incidente de seguridad que pueda surgir."
        }
      ]
    },
    fr: {
      title: "Sécurité",
      subtitle: "Comment nous protégeons vos données et maintenons la sécurité du service",
      sections: [
        {
          title: "Protection des Données",
          icon: "shield",
          content: "Nous utilisons un cryptage standard de l'industrie pour toutes les données en transit et au repos. Vos vidéos et informations personnelles sont protégées par des protocoles de sécurité avancés et des audits réguliers."
        },
        {
          title: "Sécurité de l'Infrastructure",
          icon: "server",
          content: "Notre infrastructure est hébergée sur des plateformes cloud sécurisées avec plusieurs couches de sécurité, y compris des pare-feu, la détection d'intrusion et des systèmes de surveillance 24/7."
        },
        {
          title: "Contrôle d'Accès",
          icon: "key",
          content: "Nous mettons en œuvre des contrôles d'accès stricts et des mécanismes d'authentification pour garantir que seul le personnel autorisé peut accéder aux systèmes et données sensibles."
        },
        {
          title: "Conformité",
          icon: "check",
          content: "Nous maintenons la conformité avec les normes de sécurité internationales et mettons régulièrement à jour nos mesures de sécurité pour faire face aux menaces et exigences en évolution."
        },
        {
          title: "Mises à Jour de Sécurité",
          icon: "refresh",
          content: "Nos systèmes sont régulièrement mis à jour avec les derniers correctifs de sécurité et améliorations pour protéger contre les vulnérabilités connues."
        },
        {
          title: "Réponse aux Incidents",
          icon: "alert",
          content: "Nous avons une équipe dédiée et des procédures établies pour répondre et résoudre rapidement tout incident de sécurité qui pourrait survenir."
        }
      ]
    },
    pt: {
      title: "Segurança",
      subtitle: "Como protegemos seus dados e mantemos a segurança do serviço",
      sections: [
        {
          title: "Proteção de Dados",
          icon: "shield",
          content: "Empregamos criptografia padrão da indústria para todos os dados em trânsito e em repouso. Seus vídeos e informações pessoais são protegidos usando protocolos de segurança avançados e auditorias regulares."
        },
        {
          title: "Segurança da Infraestrutura",
          icon: "server",
          content: "Nossa infraestrutura é hospedada em plataformas cloud seguras com múltiplas camadas de segurança, incluindo firewalls, detecção de intrusão e sistemas de monitoramento 24/7."
        },
        {
          title: "Controle de Acesso",
          icon: "key",
          content: "Implementamos controles de acesso rigorosos e mecanismos de autenticação para garantir que apenas pessoal autorizado possa acessar sistemas e dados sensíveis."
        },
        {
          title: "Conformidade",
          icon: "check",
          content: "Mantemos conformidade com padrões internacionais de segurança e atualizamos regularmente nossas medidas de segurança para atender às ameaças e requisitos em evolução."
        },
        {
          title: "Atualizações de Segurança",
          icon: "refresh",
          content: "Nossos sistemas são regularmente atualizados com as últimas correções e melhorias de segurança para proteger contra vulnerabilidades conhecidas."
        },
        {
          title: "Resposta a Incidentes",
          icon: "alert",
          content: "Temos uma equipe dedicada e procedimentos estabelecidos para responder e resolver rapidamente quaisquer incidentes de segurança que possam surgir."
        }
      ]
    }
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const selectedLanguage = translations[language] || translations.en;

  const getIcon = (iconName) => {
    const icons = {
      shield: (
        <svg className="w-8 h-8 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      server: (
        <svg className="w-8 h-8 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      key: (
        <svg className="w-8 h-8 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      check: (
        <svg className="w-8 h-8 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      refresh: (
        <svg className="w-8 h-8 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      alert: (
        <svg className="w-8 h-8 text-[#FF7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    };
    return icons[iconName] || icons.shield;
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedLanguage.sections.map((section, index) => (
            <div
              key={index}
              className="bg-[#22253A] p-8 rounded-2xl transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center mb-6">
                {getIcon(section.icon)}
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                {section.title}
              </h3>
              <p className="text-gray-400 text-center">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
