"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Terms() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Terms of Service",
      subtitle: "Please read these terms carefully before using our services",
      lastUpdated: "Last Updated: March 15, 2024",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using Capshun's subtitle generation services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services."
        },
        {
          title: "2. Service Description",
          content: "Capshun provides AI-powered subtitle generation services for video content. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice."
        },
        {
          title: "3. User Responsibilities",
          content: "You are responsible for all content you upload and must have the necessary rights to use such content. You agree not to upload any content that violates intellectual property rights or contains inappropriate material."
        },
        {
          title: "4. Intellectual Property",
          content: "The subtitles generated through our service are owned by you, but our software, technology, and platform remain the exclusive property of Capshun. You may not copy, modify, or reverse engineer our technology."
        },
        {
          title: "5. Limitation of Liability",
          content: "Capshun provides its services 'as is' and makes no warranties regarding accuracy or availability. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services."
        }
      ]
    },
    es: {
      title: "Términos de Servicio",
      subtitle: "Por favor, lea estos términos cuidadosamente antes de usar nuestros servicios",
      lastUpdated: "Última Actualización: 15 de marzo, 2024",
      sections: [
        {
          title: "1. Aceptación de Términos",
          content: "Al acceder o utilizar los servicios de generación de subtítulos de Capshun, aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder a nuestros servicios."
        },
        {
          title: "2. Descripción del Servicio",
          content: "Capshun proporciona servicios de generación de subtítulos impulsados por IA para contenido de video. Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto de nuestros servicios en cualquier momento sin previo aviso."
        },
        {
          title: "3. Responsabilidades del Usuario",
          content: "Eres responsable de todo el contenido que subas y debes tener los derechos necesarios para usar dicho contenido. Aceptas no subir ningún contenido que viole derechos de propiedad intelectual o contenga material inapropiado."
        },
        {
          title: "4. Propiedad Intelectual",
          content: "Los subtítulos generados a través de nuestro servicio son de tu propiedad, pero nuestro software, tecnología y plataforma siguen siendo propiedad exclusiva de Capshun. No puedes copiar, modificar o realizar ingeniería inversa de nuestra tecnología."
        },
        {
          title: "5. Limitación de Responsabilidad",
          content: "Capshun proporciona sus servicios 'tal cual' y no ofrece garantías sobre la precisión o disponibilidad. No seremos responsables por ningún daño indirecto, incidental o consecuente que surja del uso de nuestros servicios."
        }
      ]
    },
    fr: {
      title: "Conditions d'Utilisation",
      subtitle: "Veuillez lire attentivement ces conditions avant d'utiliser nos services",
      lastUpdated: "Dernière mise à jour : 15 mars 2024",
      sections: [
        {
          title: "1. Acceptation des Conditions",
          content: "En accédant ou en utilisant les services de génération de sous-titres de Capshun, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord avec une partie de ces conditions, vous ne pouvez pas accéder à nos services."
        },
        {
          title: "2. Description du Service",
          content: "Capshun fournit des services de génération de sous-titres alimentés par l'IA pour le contenu vidéo. Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect de nos services à tout moment sans préavis."
        },
        {
          title: "3. Responsabilités de l'Utilisateur",
          content: "Vous êtes responsable de tout le contenu que vous téléchargez et devez disposer des droits nécessaires pour utiliser ce contenu. Vous acceptez de ne pas télécharger de contenu qui viole les droits de propriété intellectuelle ou contient du matériel inapproprié."
        },
        {
          title: "4. Propriété Intellectuelle",
          content: "Les sous-titres générés via notre service vous appartiennent, mais notre logiciel, notre technologie et notre plateforme restent la propriété exclusive de Capshun. Vous ne pouvez pas copier, modifier ou faire de l'ingénierie inverse de notre technologie."
        },
        {
          title: "5. Limitation de Responsabilité",
          content: "Capshun fournit ses services 'tels quels' et ne donne aucune garantie concernant l'exactitude ou la disponibilité. Nous ne serons pas responsables des dommages indirects, accessoires ou consécutifs découlant de votre utilisation de nos services."
        }
      ]
    },
    pt: {
      title: "Termos de Serviço",
      subtitle: "Por favor, leia estes termos cuidadosamente antes de usar nossos serviços",
      lastUpdated: "Última Atualização: 15 de março de 2024",
      sections: [
        {
          title: "1. Aceitação dos Termos",
          content: "Ao acessar ou usar os serviços de geração de legendas da Capshun, você concorda em estar vinculado a estes Termos de Serviço. Se você discordar de qualquer parte destes termos, você não poderá acessar nossos serviços."
        },
        {
          title: "2. Descrição do Serviço",
          content: "A Capshun fornece serviços de geração de legendas baseados em IA para conteúdo em vídeo. Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto de nossos serviços a qualquer momento sem aviso prévio."
        },
        {
          title: "3. Responsabilidades do Usuário",
          content: "Você é responsável por todo o conteúdo que enviar e deve ter os direitos necessários para usar tal conteúdo. Você concorda em não enviar nenhum conteúdo que viole direitos de propriedade intelectual ou contenha material inadequado."
        },
        {
          title: "4. Propriedade Intelectual",
          content: "As legendas geradas através do nosso serviço são de sua propriedade, mas nosso software, tecnologia e plataforma permanecem propriedade exclusiva da Capshun. Você não pode copiar, modificar ou fazer engenharia reversa de nossa tecnologia."
        },
        {
          title: "5. Limitação de Responsabilidade",
          content: "A Capshun fornece seus serviços 'como estão' e não oferece garantias quanto à precisão ou disponibilidade. Não seremos responsáveis por quaisquer danos indiretos, incidentais ou consequentes decorrentes do uso de nossos serviços."
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
          <p className="text-xl text-gray-300 mb-4">
            {selectedLanguage.subtitle}
          </p>
          <p className="text-sm text-gray-400">
            {selectedLanguage.lastUpdated}
          </p>
        </div>

        <div className="space-y-8">
          {selectedLanguage.sections.map((section, index) => (
            <section key={index} className="bg-[#22253A] p-8 rounded-2xl">
              <h2 className="text-xl font-bold mb-4 text-[#FF7B7B]">
                {section.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
