import React from 'react';
import { siteConfig } from '../data/config';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {siteConfig.title}
        </h1>
        {siteConfig.subtitle && (
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            {siteConfig.subtitle}
          </p>
        )}
        
        {siteConfig.authors.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              {siteConfig.authors.map((author, index) => (
                <div key={index} className="text-blue-100">
                  <span className="font-medium">{author.name}</span>
                  {author.affiliation && (
                    <span className="text-sm block">{author.affiliation}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {siteConfig.links.paper && (
            <a 
              href={siteConfig.links.paper} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              📄 Paper
            </a>
          )}
          {siteConfig.links.code && (
            <a 
              href={siteConfig.links.code} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              💻 Code
            </a>
          )}
          {siteConfig.links.dataset && (
            <a 
              href={siteConfig.links.dataset} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              📊 Dataset
            </a>
          )}
          {siteConfig.links.demo && (
            <a 
              href={siteConfig.links.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              🎯 Demo
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

