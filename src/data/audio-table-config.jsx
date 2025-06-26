import React from 'react';
import InlineAudioPlayer from '../components/InlineAudioPlayer';
import ExpandableText from '../components/ExpandableText';
import HighlightedTranscription from '../components/HighlightedTranscription';
import ErrorStatsBadges from '../components/ErrorStatsBadges';
import TranscriptionCell from '../components/TranscriptionCell';
import preprocessedData from '../assets/preprocessedData.json';
import sample1Audio from '../assets/audio/sample_1.wav';
import sample2Audio from '../assets/audio/sample_2.wav';
import sample3Audio from '../assets/audio/sample_3.wav';


// Example configuration showing how to add inline audio to tables
export const audioTableConfig = {
  sectionTitle: "Speech Samples Analysis",
  sectionDescription: "Interactive table with audio samples for different speech processing experiments.",
  
  tables: [
    {
      title: "Kids WFST Dysfluency Samples",
      searchable: true,
      pageSize: 10,
      columns: [
        { 
          key: 'audio_file', 
          header: 'Audio Sample', 
          sortable: false,
          render: (audioPath, row) => (
            <InlineAudioPlayer
              audioSrc={audioPath}
              title={`Sample ${row.sample_id}`}
              compact={true}
              showTitle={false}
            />
          )
        },
        // phoneme transcription
        {
          key: 'phn_transcription',
          header: 'Phoneme Transcription',
          sortable: false,
          render: (value) => (
            <TranscriptionCell text={value} />
          )
        },
        // Detailed Error Statistics
        {
          key: 'error_stats',
          header: 'Error Statistics',
          sortable: false,
          render: (stats) => (
            <ErrorStatsBadges stats={stats} />
          )
        },
        // score
        { 
          key: 'score', 
          header: 'Score',
          sortable: true,
          render: (value) => `${value.toFixed(2)}`
        },
        // Advice from LLM
        {
          key: 'llm_advice',
          header: 'LLM Advice',
          sortable: false,
          render: (value) => (
            <ExpandableText text={value} />
          )
        }
      ],
      data: [
        {
          audio_file: sample1Audio,
          sample_id: "sample_1",
          speaker: "Child A",
          phn_transcription: preprocessedData["sample_1"]?.phn_transcription || "",
          error_stats: {
          substitutions: 1,
          deletions: 1,
          insertions: 2,
          total_ref_phonemes: NaN,
          verified_per: NaN
          },
          score: 2.30,
          llm_advice: preprocessedData["sample_1"]?.llm_advice || "",
          },
        {
          audio_file: sample2Audio,
          sample_id: "sample_2",
          speaker: "Child B",
          phn_transcription: preprocessedData["sample_2"]?.phn_transcription || "",
          error_stats: {
            substitutions: 3,
            deletions: 5,
            insertions: 0,
            total_ref_phonemes: NaN,
            verified_per: NaN
          },
          score: 2.21,
          llm_advice: preprocessedData["sample_2"]?.llm_advice || "",
        },
        {
          audio_file: sample3Audio,
          sample_id: "sample_3",
          speaker: "Child C",  
          phn_transcription: preprocessedData["sample_3"]?.phn_transcription || "",
          error_stats: {
            substitutions: 5,
            deletions: 3,
            insertions: 2,
            total_ref_phonemes: NaN,
            verified_per: NaN
          },
          score: 0.88,
          llm_advice: preprocessedData["sample_3"]?.llm_advice || "",
        },
        ]
    },
  ],
};

// Alternative: Simple audio column configuration
export const simpleAudioColumn = {
  key: 'audio_file',
  header: 'Audio Sample',
  sortable: false,
  render: (audioPath, row) => (
    <InlineAudioPlayer
      audioSrc={audioPath}
      title={row.title || "Audio Sample"}
      compact={true}
    />
  )
};

// Alternative: Audio with waveform visualization (requires additional library)
export const advancedAudioColumn = {
  key: 'audio_file',
  header: 'Audio Sample',
  sortable: false,
  render: (audioPath, row) => (
    <div className="space-y-2">
      <InlineAudioPlayer
        audioSrc={audioPath}
        title={row.title}
        compact={true}
        showTitle={false}
      />
      {row.waveform_data && (
        <div className="h-8 bg-gray-100 rounded flex items-end justify-center gap-px p-1">
          {row.waveform_data.map((height, i) => (
            <div
              key={i}
            className="bg-blue-400 w-1 rounded-t"
              style={{ height: `${height * 100}%` }}
            />
          ))}
        </div>
      )}
    </div>
  )
};
