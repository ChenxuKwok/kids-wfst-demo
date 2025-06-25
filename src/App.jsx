import React from 'react';
import Header from './components/Header';
import Abstract from './components/Abstract';
import VideoSection from './components/VideoSection';
import TableSection from './components/TableSection'; // Make sure this is imported
import Footer from './components/Footer';
import { siteConfig } from './data/config.jsx'; // Ensure this path is correct (.jsx!)
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <Header />

      {/* Abstract Section */}
      <Abstract />

      {/* Research Sections with Videos */}
      {siteConfig.sections.map((section, index) => (
        <div key={section.id}>
          <VideoSection section={section} />
          {/* Add separator between sections except for the last one */}
          {index < siteConfig.sections.length - 1 && (
            <div className="border-t border-gray-200"></div>
          )}
        </div>
      ))}

      {/* Table Section - This will now use the audio-enabled config */}
      {siteConfig.tableConfig && (
        <>
          <div className="border-t border-gray-200"></div>
          <TableSection tableConfig={siteConfig.tableConfig} />
        </>
      )}

      {/* Research Highlights Section (if you have it) */}
      {/* ... */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
