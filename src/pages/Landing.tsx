import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sofa, Palette, Layers, Share2, Laptop as DeviceLaptop } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg')] bg-cover bg-center opacity-5"
            style={{ filter: 'blur(8px)' }}
          ></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-32 pb-24 lg:pt-48 lg:pb-40 text-center">            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight">
              Design Your <span className="text-gradient">Perfect Space</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of interior design with our intuitive 3D room designer. 
              Create, customize, and visualize your dream space in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Designing <ArrowRight className="ml-2" />
              </Link>
              
              <a
                href="#features"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose iFurnish?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the perfect blend of technology and design to create your ideal living space
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <DeviceLaptop className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3D Visualization</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience your design in immersive 3D with realistic lighting and textures
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Easy Customization</h3>
              <p className="text-gray-600 leading-relaxed">
                Personalize every detail with our intuitive design tools and controls
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Share2 className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share & Collaborate</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your designs and get feedback from friends and professionals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Transform Your Space?
          </h2>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">iFurnish</h2>
            <p className="text-lg mb-8">Design your perfect space with confidence</p>
            <div className="text-sm">
              © {new Date().getFullYear()} iFurnish. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};