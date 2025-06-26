import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HighlightedTranscription from './HighlightedTranscription';

const TranscriptionCell = ({ text, lines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  const [clampable, setClampable] = useState(false);
  const textRef = useRef(null);
  useEffect(() => {
    if (!text) return;
    const el = textRef.current;
    if (!el) return;
    if (!expanded) {
      setClampable(el.scrollHeight > el.clientHeight + 1);
    }
  }, [text, lines, expanded]);

  if (!text) return null;

  const toggle = () => setExpanded(prev => !prev);
  const clamped = expanded ? '' : `line-clamp-${lines}`;

  return (
    <div className="space-y-1 max-w-xs">
      <div ref={textRef} className={cn('whitespace-pre-wrap', clamped)}>
        <HighlightedTranscription text={text} />
      </div>
      {clampable && (
        <Button variant="link" size="sm" className="p-0 h-auto" onClick={toggle}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
};

export default TranscriptionCell;
