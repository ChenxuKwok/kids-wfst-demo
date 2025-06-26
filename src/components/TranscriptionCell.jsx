import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HighlightedTranscription from './HighlightedTranscription';

const TranscriptionCell = ({ text, lines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const toggle = () => setExpanded(prev => !prev);
  const clamped = expanded ? '' : `line-clamp-${lines}`;

  return (
    <div className="space-y-1 max-w-xs">
      <div className={cn('whitespace-pre-wrap', clamped)}>
        <HighlightedTranscription text={text} />
      </div>
      {text.length > 0 && (
        <Button variant="link" size="sm" className="p-0 h-auto" onClick={toggle}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
};

export default TranscriptionCell;
