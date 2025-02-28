"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function About() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "About Us",
      subtitle: "Making video content accessible to everyone",
      mission: {
        title: "Our Mission",
        description: "We're on a mission to break down language barriers in video content. By leveraging cutting-edge AI technology, we make it easy for creators and businesses to reach global audiences with accurate, professional-quality subtitles."
      },
      vision: {
        title: "Our Vision",
        description: "We envision a world where language is no longer a barrier to accessing and understanding video content. Through continuous innovation in AI and language processing, we're working to make this vision a reality."
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Innovation",
            description: "Constantly pushing the boundaries of what's possible with AI and subtitle technology."
          },
          {
            title: "Accessibility",
            description: "Making professional-quality subtitles available to creators of all sizes."
          },
          {
            title: "Quality",
            description: "Delivering accurate, reliable subtitles that enhance viewer experience."
          },
          {
            title: "Global Reach",
            description: "Breaking down language barriers to connect creators with audiences worldwide."
          }
        ]
      },
      contact: {
        title: "Get in Touch",
        description: "Have questions about our service? We'd love to hear from you.",
        email: "contact@capshun.com",
        button: "Contact Us"
      }
    },
    es: {
      title: "Sobre Nosotros",
      subtitle: "Haciendo el contenido de video accesible para todos",
      mission: {
        title: "Nuestra Misión",
        description: "Nuestra misión es derribar las barreras del idioma en el contenido de video. Aprovechando la tecnología de IA de vanguardia, facilitamos que creadores y empresas lleguen a audiencias globales con subtítulos precisos y de calidad profesional."
      },
      vision: {
        title: "Nuestra Visión",
        description: "Imaginamos un mundo donde el idioma ya no sea una barrera para acceder y comprender el contenido de video. A través de la innovación continua en IA y procesamiento del lenguaje, trabajamos para hacer realidad esta visión."
      },
      values: {
        title: "Nuestros Valores",
        items: [
          {
            title: "Innovación",
            description: "Constantemente empujando los límites de lo posible con la IA y la tecnología de subtítulos."
          },
          {
            title: "Accesibilidad",
            description: "Haciendo que los subtítulos de calidad profesional estén disponibles para creadores de todos los tamaños."
          },
          {
            title: "Calidad",
            description: "Entregando subtítulos precisos y confiables que mejoran la experiencia del espectador."
          },
          {
            title: "Alcance Global",
            description: "Rompiendo las barreras del idioma para conectar creadores con audiencias en todo el mundo."
          }
        ]
      },
      contact: {
        title: "Contáctanos",
        description: "¿Tienes preguntas sobre nuestro servicio? Nos encantaría escucharte.",
        email: "contacto@capshun.com",
        button: "Contáctanos"
      }
    },
    fr: {
      title: "À Propos",
      subtitle: "Rendre le contenu vidéo accessible à tous",
      mission: {
        title: "Notre Mission",
        description: "Notre mission est de briser les barrières linguistiques dans le contenu vidéo. En utilisant une technologie d'IA de pointe, nous permettons aux créateurs et aux entreprises d'atteindre un public mondial avec des sous-titres précis et de qualité professionnelle."
      },
      vision: {
        title: "Notre Vision",
        description: "Nous imaginons un monde où la langue n'est plus un obstacle à l'accès et à la compréhension du contenu vidéo. Grâce à l'innovation continue dans l'IA et le traitement du langage, nous travaillons à faire de cette vision une réalité."
      },
      values: {
        title: "Nos Valeurs",
        items: [
          {
            title: "Innovation",
            description: "Repousser constamment les limites du possible avec l'IA et la technologie des sous-titres."
          },
          {
            title: "Accessibilité",
            description: "Rendre les sous-titres de qualité professionnelle accessibles aux créateurs de toutes tailles."
          },
          {
            title: "Qualité",
            description: "Fournir des sous-titres précis et fiables qui améliorent l'expérience du spectateur."
          },
          {
            title: "Portée Mondiale",
            description: "Briser les barrières linguistiques pour connecter les créateurs avec un public mondial."
          }
        ]
      },
      contact: {
        title: "Contactez-nous",
        description: "Vous avez des questions sur notre service ? Nous aimerions vous entendre.",
        email: "contact@capshun.com",
        button: "Contactez-nous"
      }
    },
    pt: {
      title: "Sobre Nós",
      subtitle: "Tornando o conteúdo em vídeo acessível a todos",
      mission: {
        title: "Nossa Missão",
        description: "Nossa missão é derrubar as barreiras linguísticas no conteúdo em vídeo. Aproveitando a tecnologia de IA de ponta, facilitamos para criadores e empresas alcançarem públicos globais com legendas precisas e de qualidade profissional."
      },
      vision: {
        title: "Nossa Visão",
        description: "Imaginamos um mundo onde o idioma não seja mais uma barreira para acessar e entender conteúdo em vídeo. Por meio da inovação contínua em IA e processamento de linguagem, estamos trabalhando para tornar essa visão realidade."
      },
      values: {
        title: "Nossos Valores",
        items: [
          {
            title: "Inovação",
            description: "Constantemente expandindo os limites do possível com IA e tecnologia de legendas."
          },
          {
            title: "Acessibilidade",
            description: "Disponibilizando legendas de qualidade profissional para criadores de todos os tamanhos."
          },
          {
            title: "Qualidade",
            description: "Entregando legendas precisas e confiáveis que melhoram a experiência do espectador."
          },
          {
            title: "Alcance Global",
            description: "Quebrando barreiras linguísticas para conectar criadores com públicos em todo o mundo."
          }
        ]
      },
      contact: {
        title: "Entre em Contato",
        description: "Tem perguntas sobre nosso serviço? Adoraríamos ouvir você.",
        email: "contato@capshun.com",
        button: "Contate-nos"
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
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text">
            {selectedLanguage.title}
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {selectedLanguage.subtitle}
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">{selectedLanguage.mission.title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {selectedLanguage.mission.description}
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">{selectedLanguage.vision.title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {selectedLanguage.vision.description}
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">{selectedLanguage.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedLanguage.values.items.map((value, index) => (
              <div key={index} className="bg-[#22253A] p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-[#22253A] p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">{selectedLanguage.contact.title}</h2>
          <p className="text-gray-300 mb-6">{selectedLanguage.contact.description}</p>
          <p className="text-[#FF7B7B] mb-8">{selectedLanguage.contact.email}</p>
          <button className="bg-[#FF7B7B] hover:bg-[#FF6B6B] px-8 py-4 rounded-xl font-medium transition-colors">
            {selectedLanguage.contact.button}
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
