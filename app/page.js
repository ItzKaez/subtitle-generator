import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#1C1E2A] text-white">
      {/* Navbar */}
      <NavBar />
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF7B7B] to-[#FF5F5F] inline-block text-transparent bg-clip-text">
            AI-Powered Video Captions
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your videos with accurate, dynamic subtitles in over 50+
            languages. Perfect for content creators, businesses, and educators.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/generate-captions"
              className="bg-[#FF7B7B] hover:bg-[#FF6B6B] px-8 py-4 rounded-xl font-medium transition-colors"
            >
              Try it Now
            </Link>
            <Link
              href="#features"
              className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-xl font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h3 className="text-3xl font-bold text-center mb-16">
            Why Choose Dynamic Captions?
          </h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-[#22253A] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-[#FF7B7B]/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#FF7B7B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Processing</h3>
              <p className="text-gray-400">
                Generate accurate subtitles in minutes using our advanced AI
                technology.
              </p>
            </div>
            <div className="bg-[#22253A] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-[#FF7B7B]/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#FF7B7B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Languages</h3>
              <p className="text-gray-400">
                Support for over 50+ languages with high accuracy translation.
              </p>
            </div>
            <div className="bg-[#22253A] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-[#FF7B7B]/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#FF7B7B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Easy Export</h3>
              <p className="text-gray-400">
                Export subtitles in multiple formats including SRT, VTT, and
                more.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-t border-gray-800">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-[#FF7B7B] mb-2">50+</h4>
              <p className="text-gray-400">Languages Supported</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-[#FF7B7B] mb-2">99%</h4>
              <p className="text-gray-400">Accuracy Rate</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-[#FF7B7B] mb-2">1M+</h4>
              <p className="text-gray-400">Videos Processed</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-[#FF7B7B] mb-2">24/7</h4>
              <p className="text-gray-400">Customer Support</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of content creators who trust Dynamic Captions for
            their video subtitle needs.
          </p>
          <Link
            href="/generate-captions"
            className="inline-block bg-[#FF7B7B] hover:bg-[#FF6B6B] px-8 py-4 rounded-xl font-medium transition-colors"
          >
            Try it Now - It's Free
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
