import React from 'react';
import InlineAudioPlayer from '../components/InlineAudioPlayer';
import { audioTableConfig } from './audio-table-config'; // Adjust path if you renamed the file

// Website Configuration - Edit this file to customize your content
export const siteConfig = {
  // Main title and metadata
  title: "Time-Accurate Speech Rich Transcription with Non-Fluencies",
  subtitle: "SSDM 2.0 - Advanced Speech Processing Research",
  
  // Abstract section
  abstract: {
    title: "Abstract",
    content: `Speech is a hierarchical collection of text, prosody, emotions, dysfluencies, etc. Automatic transcription of speech that goes beyond text (words) is an underexplored problem. We focus on transcribing speech along with non-fluencies (dysfluencies). The current state-of-the-art pipeline suffers from complex architecture design, training complexity, and significant shortcomings in the local sequence aligner, and it does not explore in-context learning capacity. In this work, we propose SSDM 2.0, which tackles those shortcomings via four main contributions: (1) We propose a novel neural articulatory flow to derive highly scalable speech representations. (2) We developed a full-stack connectionist subsequence aligner that captures all types of dysfluencies.(3) We introduced a mispronunciation prompt pipeline and consistency learning module into LLM to leverage dysfluency in-context pronunciation learning abilities. (4) We curated Libri-Dys and open-sourced the current largest-scale co-dysfluency corpus, Libri-Co-Dys, for future research endeavors. Overall, SSDM 2.0 outperforms SSDM and all other dysfluency transcription models by a large margin.`
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



