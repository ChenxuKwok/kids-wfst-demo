import React from 'react';
import InlineAudioPlayer from '../components/InlineAudioPlayer';
import { audioTableConfig } from './audio-table-config'; // Adjust path if you renamed the file

// Website Configuration - Edit this file to customize your content
export const siteConfig = {
  // Main title and metadata
  title: "Kids-WFST",
  subtitle: "A Phoneme Similarity-Augmented Framework for Child Speech Recognition inLanguage Disorder Assessment",
  
  // Abstract section
  abstract: {
    title: "Abstract",
    content: `Child speech recognition remains challenging, primarily due to higher fundamental frequency, greater articulatory variability, and data sparsity, preventing systems from achieving adult-level automatic speech recognition (ASR) accuracy. However, reliable child ASR is crucial for early disorder screening and longitudinal intervention monitoring. Most clinically relevant pronunciation errors occur at the sub-word level, which are often masked by word-level objectives such as Word Error Rate. Furthermore, even advanced frameworks including the previous SOTA, Weighted Finite-State Transducer (WFST), lack robustness for subtle phoneme variations. To address this, we propose Kids-WFST. It leverages a Wav2Vec2.0 based phoneme recognition model and a novel phoneme similarity-based substitution structure. When trained on a child speech corpus (MyST), Kids-WFST achieves superior child phoneme recognition against established baselines and demonstrates strong value in language assessment and dysfluency analysis, proving accurate sub-word ASR is vital for automated clinical tools.`
  },

  // Research sections with video support
  sections: [
    {
      id: "nfvppa",
      title: "nfvPPA Speech",
      description: "People with nfvPPA gradually have more trouble expressing themselves, even though they still understand the meaning of words. They might begin speaking in shorter phrases or pausing mid-sentence or mid-word. They may have increasing difficulty with pronouncing or mixing up sounds in familiar words.",
      videoUrl: "", // Add your video URL here
      videoFile: "", // Or add local video file path here
      samples: []
    },
    {
      id: "artificial1",
      title: "Artificial Simulated Speech 1",
      description: "Samples from Libri-Dys test set.",
      videoUrl: "", // Add your video URL here
      videoFile: "", // Or add local video file path here
      samples: [
        // Add audio/video samples here
        // { name: "Sample 1", file: "path/to/sample1.mp3", description: "Description" }
      ]
    },
    {
      id: "artificial2", 
      title: "Artificial Simulated Speech 2",
      description: "Samples from Libri-Dys-Co test set.",
      videoUrl: "", // Add your video URL here
      videoFile: "", // Or add local video file path here
      samples: [
        // Add audio/video samples here
        // { name: "Sample 2", file: "path/to/sample2.mp3", description: "Description" }
      ]
    }
  ],

  tableConfig: audioTableConfig,

  // Authors and affiliations
  authors: [
    {
      name: "Author Name",
      affiliation: "University Department",
      email: "example@exp.com"}
    // Add author information here
    // { name: "Author Name", affiliation: "University", email: "email@domain.com" }
  ],

  // Links and resources
  links: {
    paper: "", // Add paper URL
    code: "", // Add code repository URL
    dataset: "", // Add dataset URL
    demo: "" // Add demo URL
  },

  // Styling options
  theme: {
    primaryColor: "#3b82f6", // Blue
    accentColor: "#10b981", // Green
    backgroundColor: "#ffffff",
    textColor: "#1f2937"
  }
};



// Media files configuration
export const mediaConfig = {
  // Add your video files here
  videos: [
    // { id: "video1", title: "Demo Video", file: "videos/demo.mp4", thumbnail: "images/thumb1.jpg" },
    // { id: "video2", title: "Results", file: "videos/results.mp4", thumbnail: "images/thumb2.jpg" }
  ],
  
  // Add your image files here
  images: [
    // { id: "diagram1", file: "images/architecture.png", alt: "System Architecture" },
    // { id: "results", file: "images/results.png", alt: "Experimental Results" }
  ],

  // Add your audio files here
  audio: [
    // { id: "sample1", file: "audio/sample1.mp3", title: "Speech Sample 1" },
    // { id: "sample2", file: "audio/sample2.mp3", title: "Speech Sample 2" }
  ]
};



