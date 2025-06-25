import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const VideoSection = ({ section }) => {
  const [isPlaying, setIsPlaying] = useState({});

  const togglePlay = (id) => {
    setIsPlaying(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            {section.title}
          </h2>
          
          {section.description && (
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              {section.description}
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Video Section */}
            {(section.videoUrl || section.videoFile) && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  {section.videoUrl ? (
                    <iframe
                      src={section.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${section.title} Video`}
                    />
                  ) : section.videoFile ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      poster={section.thumbnail}
                    >
                      <source src={section.videoFile} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <Play size={48} className="mx-auto mb-2" />
                        <p>Video will appear here</p>
                        <p className="text-sm">Add videoUrl or videoFile to config</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>
            )}

            {/* Audio Samples Section */}
            {section.samples && section.samples.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Volume2 className="mr-2" size={24} />
                  Audio Samples
                </h3>

                <div className="space-y-4">
                  {section.samples.map((sample, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{sample.name}</h4>
                        <button
                          onClick={() => togglePlay(`${section.id}-${index}`)}
                          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                          {isPlaying[`${section.id}-${index}`] ?
                            <Pause size={16} /> :
                            <Play size={16} />
                          }
                        </button>
                      </div>
                      {sample.description && (
                        <p className="text-sm text-gray-600 mb-3">{sample.description}</p>
                      )}
                      <audio
                        className="w-full"
                        controls
                        onPlay={() => setIsPlaying(prev => ({ ...prev, [`${section.id}-${index}`]: true }))}
                        onPause={() => setIsPlaying(prev => ({ ...prev, [`${section.id}-${index}`]: false }))}
                      >
                        <source src={sample.file} type="audio/mpeg" />
                        <source src={sample.file} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional content area for custom elements */}
          {section.customContent && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <div dangerouslySetInnerHTML={{ __html: section.customContent }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;