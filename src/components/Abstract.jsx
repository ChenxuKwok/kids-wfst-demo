import React from 'react';
import { siteConfig } from '../data/config';

const Abstract = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {siteConfig.abstract.title}
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg leading-relaxed text-gray-700 text-justify">
            <strong className="text-blue-600">Abstract.</strong> {siteConfig.abstract.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Abstract;

