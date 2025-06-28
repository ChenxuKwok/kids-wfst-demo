import React from 'react';
import { siteConfig } from '../data/config';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">{siteConfig.title}</h3>
          
          {siteConfig.authors.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Authors</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {siteConfig.authors.map((author, index) => (
                  <div key={index} className="text-gray-300">
                    <div className="font-medium">{author.name}</div>
                    {author.affiliation && (
                      <div className="text-sm">{author.affiliation}</div>
                    )}
                    {author.email && (
                      <a 
                        href={`mailto:${author.email}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {author.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {siteConfig.links.paper && (
                <a 
                  href={siteConfig.links.paper} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  📄 Paper
                </a>
              )}
              {siteConfig.links.code && (
                <a 
                  href={siteConfig.links.code} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  💻 Code
                </a>
              )}
              {siteConfig.links.dataset && (
                <a 
                  href={siteConfig.links.dataset} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  📊 Dataset
                </a>
              )}
              {siteConfig.links.demo && (
                <a 
                  href={siteConfig.links.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  🎯 Demo
                </a>
              )}
            </div>
            
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} K-Function | Berkeley Speech Group | ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

