"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Blog() {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      title: "Blog",
      subtitle: "Latest insights, guides, and industry news",
      posts: [
        {
          title: "The Future of Video Accessibility",
          date: "March 15, 2024",
          category: "Industry Trends",
          excerpt: "Explore how AI is revolutionizing video accessibility and what this means for content creators worldwide.",
          imageUrl: "https://picsum.photos/800/400?random=1",
          readMore: "Read More"
        },
        {
          title: "Best Practices for Video Subtitling",
          date: "March 10, 2024",
          category: "Tutorials",
          excerpt: "Learn the essential tips and tricks for creating professional-quality subtitles that enhance viewer engagement.",
          imageUrl: "https://picsum.photos/800/400?random=2",
          readMore: "Read More"
        },
        {
          title: "Making Content Global: Translation Tips",
          date: "March 5, 2024",
          category: "Tips & Tricks",
          excerpt: "Discover effective strategies for translating your content and reaching international audiences.",
          imageUrl: "https://picsum.photos/800/400?random=3",
          readMore: "Read More"
        }
      ]
    },
    es: {
      title: "Blog",
      subtitle: "Últimas perspectivas, guías y noticias de la industria",
      posts: [
        {
          title: "El Futuro de la Accesibilidad en Video",
          date: "15 de marzo, 2024",
          category: "Tendencias de la Industria",
          excerpt: "Explora cómo la IA está revolucionando la accesibilidad del video y qué significa esto para los creadores de contenido en todo el mundo.",
          imageUrl: "https://picsum.photos/800/400?random=1",
          readMore: "Leer Más"
        },
        {
          title: "Mejores Prácticas para Subtitular Videos",
          date: "10 de marzo, 2024",
          category: "Tutoriales",
          excerpt: "Aprende los consejos y trucos esenciales para crear subtítulos de calidad profesional que mejoren la participación del espectador.",
          imageUrl: "https://picsum.photos/800/400?random=2",
          readMore: "Leer Más"
        },
        {
          title: "Haciendo el Contenido Global: Consejos de Traducción",
          date: "5 de marzo, 2024",
          category: "Consejos y Trucos",
          excerpt: "Descubre estrategias efectivas para traducir tu contenido y alcanzar audiencias internacionales.",
          imageUrl: "https://picsum.photos/800/400?random=3",
          readMore: "Leer Más"
        }
      ]
    },
    fr: {
      title: "Blog",
      subtitle: "Dernières perspectives, guides et actualités du secteur",
      posts: [
        {
          title: "L'Avenir de l'Accessibilité Vidéo",
          date: "15 mars 2024",
          category: "Tendances du Secteur",
          excerpt: "Découvrez comment l'IA révolutionne l'accessibilité vidéo et ce que cela signifie pour les créateurs de contenu du monde entier.",
          imageUrl: "https://picsum.photos/800/400?random=1",
          readMore: "Lire Plus"
        },
        {
          title: "Meilleures Pratiques pour le Sous-titrage Vidéo",
          date: "10 mars 2024",
          category: "Tutoriels",
          excerpt: "Apprenez les conseils et astuces essentiels pour créer des sous-titres de qualité professionnelle qui améliorent l'engagement des spectateurs.",
          imageUrl: "https://picsum.photos/800/400?random=2",
          readMore: "Lire Plus"
        },
        {
          title: "Rendre le Contenu Global : Conseils de Traduction",
          date: "5 mars 2024",
          category: "Conseils et Astuces",
          excerpt: "Découvrez des stratégies efficaces pour traduire votre contenu et atteindre un public international.",
          imageUrl: "https://picsum.photos/800/400?random=3",
          readMore: "Lire Plus"
        }
      ]
    },
    pt: {
      title: "Blog",
      subtitle: "Últimas percepções, guias e notícias do setor",
      posts: [
        {
          title: "O Futuro da Acessibilidade em Vídeo",
          date: "15 de março, 2024",
          category: "Tendências do Setor",
          excerpt: "Explore como a IA está revolucionando a acessibilidade em vídeo e o que isso significa para criadores de conteúdo em todo o mundo.",
          imageUrl: "https://picsum.photos/800/400?random=1",
          readMore: "Ler Mais"
        },
        {
          title: "Melhores Práticas para Legendagem de Vídeos",
          date: "10 de março, 2024",
          category: "Tutoriais",
          excerpt: "Aprenda as dicas e truques essenciais para criar legendas de qualidade profissional que aumentam o engajamento do espectador.",
          imageUrl: "https://picsum.photos/800/400?random=2",
          readMore: "Ler Mais"
        },
        {
          title: "Tornando o Conteúdo Global: Dicas de Tradução",
          date: "5 de março, 2024",
          category: "Dicas e Truques",
          excerpt: "Descubra estratégias eficazes para traduzir seu conteúdo e alcançar públicos internacionais.",
          imageUrl: "https://picsum.photos/800/400?random=3",
          readMore: "Ler Mais"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedLanguage.posts.map((post, index) => (
            <article
              key={index}
              className="bg-[#22253A] rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#22253A] to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#FF7B7B]">{post.category}</span>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                <p className="text-gray-400 mb-6">{post.excerpt}</p>
                <button className="text-[#FF7B7B] font-medium hover:text-[#FF6B6B] transition-colors">
                  {post.readMore} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
