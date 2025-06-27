import React from 'react';
import InlineAudioPlayer from '../components/InlineAudioPlayer';
import { audioTableConfig } from './audio-table-config'; // Adjust path if you renamed the file
import video from '../assets/videos/Sample Media Clip 11.mp4'

// Website Configuration - Edit this file to customize your content
export const siteConfig = {
  // Main title and metadata
  title: "K‑Function",
  subtitle: "Joint Pronunciation Transcription and Feedback for Evaluating Kids Language Function",
  
  // Abstract section
  // K‑Function: Joint Pronunciation Transcription and Feedback for Evaluating Kids Language Function
  abstract: {
    title: "Abstract",
    content: `Early evaluation of children’s language is frustrated by the high pitch, long phones, and sparse data that derail automatic speech recognisers. We introduce K-Function, a unified framework that combines accurate sub-word transcription, objective scoring, and actionable feedback. Its core, Kids-WFST, merges a Wav2Vec2 phoneme encoder with a phoneme-similarity Dysfluent-WFST to capture child-specific errors while remaining fully interpretable. Kids-WFST attains 1.39 % phoneme error on MyST and 8.61 % on Multitudes—absolute gains of 10.47 and 7.06 points over a beam-search decoder. These high-fidelity transcripts power an LLM that grades verbal skills, milestones, reading, and comprehension, aligning with human proctors and supplying tongue-and-lip visualizations plus targeted advice. The results show that precise phoneme recognition cements a complete diagnostic–feedback loop, paving the way for scalable, clinician-ready language assessment.`
  },

  // Research sections with video support
  sections: [
    {
      id: "Video Introduction",
      title: "K-Function Introduction",
      description: "This section provides an overview of the K-Function framework, highlighting its key features and advantages over traditional methods.",
      videoUrl: "", // Add your video URL here
      videoFile: video, // Or add local video file path here
      // samples: []
    },
  ],

  tableConfig: audioTableConfig,

  // Authors and affiliations
  authors: [
  { "name": "Shuhe Li*", "affiliation": "Zhejiang University", "email": "lishuhe0325@gmail.com"},
  { "name": "Chenxu Guo* (* equal contribution)", "affiliation": "Zhejiang University", "email": "louis.kwok.work@gmail.com"},
  { "name": "Jiachen Lian", "affiliation": "UC Berkeley", "email": "jiachenlian@berkeley.edu"},
  { "name": "Cheol Jun Cho", "affiliation": "UC Berkeley", "email": "cheoljun@berkeley.edu"},
  { "name": "Wenshuo Zhao", "affiliation": "Zhejiang University", "email": "edriczhao2025@gmail.com"},
  { "name": "Xuanru Zhou", "affiliation": "Zhejiang University", "email":"xuanruzhou15@gmail.com" },
  { "name": "Dingkun Zhou", "affiliation": "SCUT", "email": "jackkun818@gmail.com"},
  { "name": "Sam Wang", "affiliation": "UC Berkeley", "email": "linchiunwang@berkeley.edu"},
  { "name": "Grace Wang", "affiliation": "UC Berkeley", "email": "grace.wang343@berkeley.edu"},
  { "name": "Jingze Yang", "affiliation": "Zhejiang University", "email": "jingzeyang9527@gmail.com"},
  { "name": "Jingyi Xu", "affiliation": "Zhejiang University", "email": "xusaoki@gmail.com"},
  { "name": "Ruohan Bao", "affiliation": "Zhejiang University", "email": "stickspark3186@gmail.com"},
  { "name": "Elise Brenner", "affiliation": "UCSF", "email": "Elise.Brenner@ucsf.edu"},
  { "name": "Brandon In", "affiliation": "UCSF", "email": "Brandon.in@ucsf.edu"},
  { "name": "Francesca Pei", "affiliation": "UCSF", "email": "Francesca.Pei@ucsf.edu"},
  { "name": "Maria Luisa Gorno-Tempini", "affiliation": "UCSF", "email": "marialuisa.gornotempini@ucsf.edu"},
  { "name": "Gopala Anumanchipalli", "affiliation": "UC Berkeley", "email": "gopala@berkeley.edu"}
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
    primaryColor: "#f8985b", // orange color
    accentColor: "#fde5d6", // Light background color
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



