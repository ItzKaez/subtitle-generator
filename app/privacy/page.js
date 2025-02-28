"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Privacy() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Privacy Policy",
      subtitle: "How we handle and protect your data",
      lastUpdated: "Last Updated: March 15, 2024",
      sections: [
        {
          title: "Information We Collect",
          content: "We collect information that you provide directly to us, including your name, email address, and any videos you upload for subtitle generation. We also automatically collect certain information about your device and how you interact with our services."
        },
        {
          title: "How We Use Your Information",
          content: "We use the information we collect to provide and improve our subtitle generation services, process your requests, communicate with you, and ensure the security of our services. Your videos are processed solely for the purpose of generating subtitles and are automatically deleted after processing."
        },
        {
          title: "Data Security",
          content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest."
        },
        {
          title: "Your Rights",
          content: "You have the right to access, correct, or delete your personal information. You can also request a copy of your data or object to its processing. Contact us to exercise these rights."
        }
      ]
    },
    es: {
      title: "Política de Privacidad",
      subtitle: "Cómo manejamos y protegemos tus datos",
      lastUpdated: "Última Actualización: 15 de marzo, 2024",
      sections: [
        {
          title: "Información que Recopilamos",
          content: "Recopilamos la información que nos proporcionas directamente, incluyendo tu nombre, dirección de correo electrónico y cualquier video que subas para la generación de subtítulos. También recopilamos automáticamente cierta información sobre tu dispositivo y cómo interactúas con nuestros servicios."
        },
        {
          title: "Cómo Usamos tu Información",
          content: "Utilizamos la información que recopilamos para proporcionar y mejorar nuestros servicios de generación de subtítulos, procesar tus solicitudes, comunicarnos contigo y garantizar la seguridad de nuestros servicios. Tus videos se procesan únicamente con el fin de generar subtítulos y se eliminan automáticamente después del procesamiento."
        },
        {
          title: "Seguridad de Datos",
          content: "Implementamos medidas técnicas y organizativas apropiadas para proteger tu información personal contra acceso, alteración, divulgación o destrucción no autorizados. Todos los datos están encriptados en tránsito y en reposo."
        },
        {
          title: "Tus Derechos",
          content: "Tienes derecho a acceder, corregir o eliminar tu información personal. También puedes solicitar una copia de tus datos u oponerte a su procesamiento. Contáctanos para ejercer estos derechos."
        }
      ]
    },
    fr: {
      title: "Politique de Confidentialité",
      subtitle: "Comment nous gérons et protégeons vos données",
      lastUpdated: "Dernière mise à jour : 15 mars 2024",
      sections: [
        {
          title: "Informations que Nous Collectons",
          content: "Nous collectons les informations que vous nous fournissez directement, y compris votre nom, adresse e-mail et toutes les vidéos que vous téléchargez pour la génération de sous-titres. Nous collectons également automatiquement certaines informations sur votre appareil et la façon dont vous interagissez avec nos services."
        },
        {
          title: "Comment Nous Utilisons Vos Informations",
          content: "Nous utilisons les informations collectées pour fournir et améliorer nos services de génération de sous-titres, traiter vos demandes, communiquer avec vous et assurer la sécurité de nos services. Vos vidéos sont traitées uniquement dans le but de générer des sous-titres et sont automatiquement supprimées après le traitement."
        },
        {
          title: "Sécurité des Données",
          content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l'accès, la modification, la divulgation ou la destruction non autorisés. Toutes les données sont cryptées en transit et au repos."
        },
        {
          title: "Vos Droits",
          content: "Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez également demander une copie de vos données ou vous opposer à leur traitement. Contactez-nous pour exercer ces droits."
        }
      ]
    },
    pt: {
      title: "Política de Privacidade",
      subtitle: "Como gerenciamos e protegemos seus dados",
      lastUpdated: "Última Atualização: 15 de março de 2024",
      sections: [
        {
          title: "Informações que Coletamos",
          content: "Coletamos informações que você fornece diretamente para nós, incluindo seu nome, endereço de e-mail e quaisquer vídeos que você envie para geração de legendas. Também coletamos automaticamente certas informações sobre seu dispositivo e como você interage com nossos serviços."
        },
        {
          title: "Como Usamos Suas Informações",
          content: "Usamos as informações que coletamos para fornecer e melhorar nossos serviços de geração de legendas, processar suas solicitações, comunicar com você e garantir a segurança de nossos serviços. Seus vídeos são processados apenas para fins de geração de legendas e são automaticamente excluídos após o processamento."
        },
        {
          title: "Segurança de Dados",
          content: "Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso, alteração, divulgação ou destruição não autorizados. Todos os dados são criptografados em trânsito e em repouso."
        },
        {
          title: "Seus Direitos",
          content: "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode solicitar uma cópia de seus dados ou se opor ao seu processamento. Entre em contato conosco para exercer esses direitos."
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

        <div className="space-y-12">
          {selectedLanguage.sections.map((section, index) => (
            <section key={index} className="bg-[#22253A] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-[#FF7B7B]">
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
