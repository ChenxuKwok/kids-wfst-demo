import React, { useMemo, useContext } from 'react';
import { cn } from '@/lib/utils';
import { RowHighlightContext } from './DataTable';

// Parse transcription string with <DEL>, <SUB>, <INS> tags
function parseTranscription(text) {
  if (!text) return [];
  const normalized = text.replace(/[`\u2018\u2019]/g, "'");
  const regex = /<\\?DEL>|<\\?SUB>|<\\?INS>|'[^']+'/g;
  const tokens = [];
  let current = null;
  for (const match of normalized.matchAll(regex)) {
    const token = match[0];
    switch (token) {
      case '<DEL>':
        current = 'del';
        break;
      case '<\\DEL>':
        current = null;
        break;
      case '<SUB>':
        current = 'sub';
        break;
      case '<\\SUB>':
        current = null;
        break;
      case '<INS>':
        current = 'ins';
        break;
      case '<\\INS>':
        current = null;
        break;
      default:
        tokens.push({ text: token.replace(/'/g, ''), type: current });
    }
  }
  return tokens;
}

const colorMap = {
  del: 'bg-red-100 text-red-800',
  sub: 'bg-yellow-100 text-yellow-800',
  ins: 'bg-green-100 text-green-800',
};

const HighlightedTranscription = ({ text }) => {
  const tokens = useMemo(() => parseTranscription(text), [text]);
  const { highlight } = useContext(RowHighlightContext);
  return (
    <p className="text-sm text-gray-700 flex flex-wrap gap-1">
      {tokens.map((tok, idx) => (
        <span
          key={idx}
          data-type={tok.type}
          className={cn(
            tok.type && colorMap[tok.type],
            tok.type && 'px-1 rounded',
            // highlight === tok.type && 'ring-2 ring-offset-2'
            highlight && highlight === tok.type && 'ring-2 ring-offset-2'
          )}
        >
          {tok.text}
        </span>
      ))}
    </p>
  );
};

export default HighlightedTranscription;
