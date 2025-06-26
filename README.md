# Project Overview

This repository is a **Vite-based React project** designed to present research content through a modern, responsive website template. It supports video, audio, and easy customization.

**Key Features:**
- Responsive design
- Custom content via external data files
- Video and audio support
- Built with React, Tailwind CSS, and shadcn/ui components

---

## Project Structure

```
ssdm-website-template/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, videos, audio files
│   ├── components/         # React components
│   │   ├── Header.jsx      # Site header with title and navigation
│   │   ├── Abstract.jsx    # Research abstract section
│   │   ├── VideoSection.jsx# Video and audio content sections
│   │   └── Footer.jsx      # Site footer
│   ├── data/
│   │   └── config.js       # 🔧 MAIN CONFIGURATION FILE
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
```

- **src/assets**: Audio, images, videos, transcription text, and LLM advice
- **src/components**: Page-level and UI components (see `components/ui`)
- **src/App.jsx**: Main app composition

Example usage in `App.jsx`:
```jsx
import Header from './components/Header';
import Abstract from './components/Abstract';
import VideoSection from './components/VideoSection';
import TableSection from './components/TableSection';
import Footer from './components/Footer';
import { siteConfig } from './data/config.jsx';

{siteConfig.sections.map(... <VideoSection /> ...)}
{siteConfig.tableConfig && <TableSection ... />}
```

---

## Configuration

Most content is provided via `src/data/config.jsx`. The `siteConfig` object defines:

```js
export const siteConfig = {
  title: "Time-Accurate Speech Rich Transcription with Non-Fluencies",
  subtitle: "SSDM 2.0 - Advanced Speech Processing Research",
  abstract: { ... },
  sections: [
    { id: "nfvppa", title: "nfvPPA Speech", ... },
    { id: "artificial1", title: "Artificial Simulated Speech 1", ... },
    { id: "artificial2", title: "Artificial Simulated Speech 2", ... }
  ],
  tableConfig: audioTableConfig,
  ...
};
```

### Table Configuration Example

Inline audio samples are included in tables using the `InlineAudioPlayer` component:

```js
export const audioTableConfig = {
  sectionTitle: "Speech Samples Analysis",
  sectionDescription: "Interactive table with audio samples...",
  tables: [
    {
      title: "Kids WFST Dysfluency Samples",
      toggleableColumns: ['phn_transcription', 'llm_advice'],
      searchable: true,
      downloadable: true,
      pageSize: 10,
      columns: [
        { key: 'audio_file', header: 'Audio Sample',
          render: (audioPath, row) => (
            <InlineAudioPlayer audioSrc={audioPath}
                               title={`Sample ${row.sample_id}`}
                               compact={true}
                               showTitle={false} />
          )
        },
        // ...
      ],
  data: [ { audio_file: "../assets/audio/sample_1.wav", ... } ]
    }
  ]
};
```

The `llm_advice` field now supports **Markdown** formatting. Advice text files
can include lists, links, and other Markdown elements which will be rendered in
the table.

---

## Interactivity Components

- **DataTable.jsx**: Renders tables with search, pagination, CSV download, and column visibility controls.
- **InlineAudioPlayer.jsx**: Audio playback with play/pause, progress, mute, and download.

---

## Scripts

A Node.js script (`scripts/preprocess-data.js`) preprocesses transcription and LLM advice files:

```js
const transcriptionDir = path.join(dataDir, "transcription");
const llmAdviceDir = path.join(dataDir, "llm_advice");
// ...
fs.readdirSync(transcriptionDir).forEach(file => { ... });
fs.readdirSync(llmAdviceDir).forEach(file => { ... });
fs.writeFileSync(outputFilePath, JSON.stringify(preprocessedData, null, 2), "utf8");
```

---

## Setup

To run the project locally:

```sh
pnpm install
pnpm run dev
pnpm run build
```

---

## Customization & Next Steps

- **Edit `src/data/config.jsx`**: Update title, authors, sections, and table content.
- **Add media assets**: Place audio in `src/assets/audio`, videos in `src/assets/videos`, images in `src/assets/images`.
- **Explore shadcn UI components**: See `src/components/ui` for design system details.
- **Try the data preprocessing script**: Use your own transcription/LLM files.
- **Review the README checklist**: For full customization and deployment steps.

---

## Summary

This is a straightforward, highly configurable React/Tailwind site. Familiarity with React components, Vite, and Tailwind CSS will help you customize and extend the project.