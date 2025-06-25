# Kids WFST

A modern, responsive website template for research projects. This template is designed to be easily customizable with external data files and includes built-in support for video and audio content.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Easy Customization**: All content is configurable through external data files
- **Video Support**: Embed videos from URLs or local files
- **Audio Samples**: Display and play audio samples with custom controls
- **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components
- **Research-Focused**: Designed specifically for academic and research presentations

## 📁 Project Structure

```
ssdm-website-template/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, videos, audio files
│   ├── components/        # React components
│   │   ├── Header.jsx     # Site header with title and navigation
│   │   ├── Abstract.jsx   # Research abstract section
│   │   ├── VideoSection.jsx # Video and audio content sections
│   │   └── Footer.jsx     # Site footer
│   ├── data/
│   │   └── config.js      # 🔧 MAIN CONFIGURATION FILE
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🛠️ Setup and Installation

1. **Install Dependencies**
   ```bash
   cd ssdm-website-template
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   pnpm run dev
   ```
   The site will be available at `http://localhost:5173`

3. **Build for Production**
   ```bash
   pnpm run build
   ```

## 📝 Customization Guide

### 1. Basic Site Information

Edit `src/data/config.js` to customize your site:

```javascript
export const siteConfig = {
  title: "Your Research Title",
  subtitle: "Your Research Subtitle",
  abstract: {
    title: "Abstract",
    content: "Your research abstract goes here..."
  },
  // ... more configuration options
};
```

### 2. Adding Authors

```javascript
authors: [
  { 
    name: "Dr. Jane Smith", 
    affiliation: "University of Example", 
    email: "jane.smith@example.edu" 
  },
  { 
    name: "Prof. John Doe", 
    affiliation: "Research Institute", 
    email: "john.doe@research.org" 
  }
],
```

### 3. Adding Research Sections

```javascript
sections: [
  {
    id: "section1",
    title: "Your Section Title",
    description: "Description of this research section",
    videoUrl: "https://youtube.com/embed/your-video-id", // For YouTube/external videos
    videoFile: "videos/your-video.mp4", // For local video files
    samples: [
      { 
        name: "Audio Sample 1", 
        file: "audio/sample1.mp3", 
        description: "Description of the sample" 
      }
    ]
  }
]
```

### 4. Adding Media Files

1. **Videos**: Place video files in `src/assets/videos/`
2. **Audio**: Place audio files in `src/assets/audio/`
3. **Images**: Place images in `src/assets/images/`

Update the `mediaConfig` in `config.js`:

```javascript
export const mediaConfig = {
  videos: [
    { 
      id: "demo", 
      title: "Demo Video", 
      file: "videos/demo.mp4", 
      thumbnail: "images/demo-thumb.jpg" 
    }
  ],
  audio: [
    { 
      id: "sample1", 
      file: "audio/sample1.mp3", 
      title: "Speech Sample 1" 
    }
  ]
};
```

### 5. Customizing Colors and Theme

```javascript
theme: {
  primaryColor: "#3b82f6",    // Blue
  accentColor: "#10b981",     // Green
  backgroundColor: "#ffffff", // White
  textColor: "#1f2937"       // Dark gray
}
```

### 6. Adding External Links

```javascript
links: {
  paper: "https://arxiv.org/abs/your-paper-id",
  code: "https://github.com/your-username/your-repo",
  dataset: "https://your-dataset-url.com",
  demo: "https://your-demo-url.com"
}
```

## 🎥 Video Integration

The template supports multiple video formats:

### YouTube/External Videos
```javascript
videoUrl: "https://youtube.com/embed/VIDEO_ID"
```

### Local Video Files
```javascript
videoFile: "videos/your-video.mp4"
```

### Supported Video Formats
- MP4 (recommended)
- WebM
- OGV

## 🔊 Audio Integration

### Adding Audio Samples
```javascript
samples: [
  {
    name: "Sample Name",
    file: "audio/sample.mp3", // or .wav, .ogg
    description: "Description of the audio sample"
  }
]
```

### Supported Audio Formats
- MP3 (recommended)
- WAV
- OGG

## 🎨 Styling and Customization

The template uses Tailwind CSS for styling. You can:

1. **Modify existing styles** in component files
2. **Add custom CSS** in `src/App.css`
3. **Use Tailwind classes** for quick styling changes

## 📱 Mobile Responsiveness

The template is fully responsive and includes:
- Mobile-optimized navigation
- Responsive video players
- Touch-friendly audio controls
- Adaptive layouts for all screen sizes

## 🚀 Deployment

### Development
```bash
pnpm run dev --host
```

### Production Build
```bash
pnpm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📋 Checklist for Customization

- [ ] Update site title and subtitle in `config.js`
- [ ] Add your research abstract
- [ ] Add author information
- [ ] Create research sections with descriptions
- [ ] Add video files to `src/assets/videos/`
- [ ] Add audio files to `src/assets/audio/`
- [ ] Update video and audio references in `config.js`
- [ ] Add external links (paper, code, dataset, demo)
- [ ] Customize colors and theme
- [ ] Test on mobile devices
- [ ] Build and deploy

## 🆘 Troubleshooting

### Common Issues

1. **Videos not playing**: Check file paths and formats
2. **Audio not loading**: Ensure audio files are in supported formats
3. **Styling issues**: Clear browser cache and rebuild
4. **Build errors**: Check for syntax errors in `config.js`

### File Path Guidelines

- Use relative paths from the `src/assets/` directory
- Example: `videos/demo.mp4` for `src/assets/videos/demo.mp4`
- Ensure file extensions match actual file types

## 🤝 Contributing

Feel free to customize this template for your research needs. The modular structure makes it easy to add new components or modify existing ones.

## 📄 License

This template is provided as-is for research and educational purposes.

---

**Happy researching! 🔬✨**

