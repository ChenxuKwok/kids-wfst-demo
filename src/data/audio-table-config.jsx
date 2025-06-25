import React from 'react';
import InlineAudioPlayer from '../components/InlineAudioPlayer';
import preprocessedData from '../assets/preprocessedData.json';

// Example configuration showing how to add inline audio to tables
export const audioTableConfig = {
  sectionTitle: "Speech Samples Analysis",
  sectionDescription: "Interactive table with audio samples for different speech processing experiments.",
  
  tables: [
    {
      title: "Kids WFST Dysfluency Samples",
      toggleableColumns: [ // NEW: Define columns that can be shown/hidden
        'phn_transcription',
        'llm_advice'
      ],
      searchable: true,
      downloadable: true,
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
          sortable: true,
          render: (value) => (
            <div className="max-w-xs">
              <p className="text-sm text-gray-700 line-clamp-2">{value}</p>
            </div>
          )
        },
        // Detailed Error Statistics
        {
          key: 'error_stats',
          header: 'Error Statistics',
          sortable: false,
          render: (stats) => (
            <div className="flex flex-col space-y-1">
              <div className="text-xs text-gray-600">Substitutions: {stats.substitutions}</div>
              <div className="text-xs text-gray-600">Deletions: {stats.deletions}</div>
              <div className="text-xs text-gray-600">Insertions : {stats.insertions}</div>
              <div className="text-xs text-gray-600">Total reference phonemes: {stats.total_ref_phonemes}</div>
              <div className="text-xs text-gray-600">Verified PER: {stats.verified_per.toFixed(2)}%</div>
            </div>
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
            <div className="max-w-xs">
              <p className="text-sm text-gray-700 line-clamp-2">{value}</p>
            </div>
          )
        }
      ],
      data: [
        {
          audio_file: "../assets/audio/sample_1.wav",
          sample_id: "sample_1",
          speaker: "Child A",
          phn_transcription: preprocessedData["sample_1"]?.phn_transcription || "",
          error_stats: {
          substitutions: 91,
          deletions: 82,
          insertions: 12,
          total_ref_phonemes: 573,
          verified_per: 32.29
          },
          score: 0.88,
          llm_advice: preprocessedData["sample_1"]?.llm_advice || "",
          },
        ]
    },
  ],
  
  additionalContent: `
    <div class="bg-blue-50 p-6 rounded-lg">
      <h4 class="text-lg font-semibold mb-3 text-blue-800">Audio Sample Guidelines</h4>
      <div class="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
        <div>
          <h5 class="font-medium mb-2">Supported Formats:</h5>
          <ul class="list-disc list-inside space-y-1">
            <li>MP3 (recommended)</li>
            <li>WAV</li>
            <li>OGG</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium mb-2">Best Practices:</h5>
          <ul class="list-disc list-inside space-y-1">
            <li>Keep files under 5MB</li>
            <li>Use descriptive filenames</li>
            <li>Optimize for web playback</li>
          </ul>
        </div>
      </div>
    </div>
  `
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
